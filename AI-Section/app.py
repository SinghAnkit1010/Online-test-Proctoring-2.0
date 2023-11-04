import cv2
import mediapipe as mp
import numpy as np
import math
import torch
from phone_detector import phone_detection
from fastapi import FastAPI
from flask import Flask,render_template,request,redirect,url_for,session,Response,jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin



app = Flask(__name__,template_folder="template")
CORS(app) 
api = Api(app)

mp_face_detection = mp.solutions.face_detection
face_detection = mp_face_detection.FaceDetection(model_selection = 1,min_detection_confidence = 0.5)

mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)

mp_drawing = mp.solutions.drawing_utils
drawing_spec = mp_drawing.DrawingSpec(thickness=1, circle_radius=1)

streaming = True


def cal_distance(p1,p2):
    return math.sqrt(((p1[0] - p2[0]) ** 2) + ((p1[1] - p2[1]) ** 2)) 

def video_streaming():
    global not_detected
    global many_person
    global phone_sus
    global head_move
    global talk
    not_detected = 0
    many_person = 0
    phone_sus = 0
    head_move = 0
    talk = 0
    global capture
    capture = cv2.VideoCapture(0)
    while streaming:
        print("not detected:" + str(not_detected))
        print("many_person:" + str(many_person))
        print("phone detected:" + str(phone_sus))
        print("head moved:" + str(head_move))
        print("talked:" + str(talk))
        isTrue,image = capture.read()
        if not isTrue:
            continue
        try:
            image = cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
            keypoints = face_mesh.process(image)
            faces = face_detection.process(image)
            if not(keypoints.multi_face_landmarks):
                not_detected +=1
                cv2.putText(image,"No Person Detected",(5,40),cv2.FONT_HERSHEY_SIMPLEX,1,(255,0,0),1)
            else:
                if(len(faces.detections) > 1):
                    many_person += 1
                    cv2.putText(image,"Many Persons Detected",(5,40),cv2.FONT_HERSHEY_COMPLEX,1,(255,0,0),1)
                else:
                    img_h, img_w, img_c = image.shape
                    face_3d = []
                    face_2d = []  
                    for idx,landmarks in enumerate(keypoints.multi_face_landmarks[0].landmark):
                        if idx == 33 or idx == 263 or idx == 1 or idx == 61 or idx == 291 or idx == 199:
                            if idx == 1:
                                nose_2d =  (landmarks.x * img_w,landmarks.y * img_h)
                                nose_3d = (landmarks.x * img_w,landmarks.y * img_h,landmarks.z * 3000)
                            x,y = int(landmarks.x * img_w),(landmarks.y * img_h)
                            face_2d.append([x,y])
                            face_3d.append([x,y,landmarks.z])
                        if idx == 13:
                            upperlip_1 = (int(landmarks.x * img_w), int(landmarks.y * img_h))
                        if idx == 14:
                            lowerlip_1 = (int(landmarks.x * img_w), int(landmarks.y * img_h)) 
                        if idx == 82:
                            upperlip_2 = (int(landmarks.x * img_w), int(landmarks.y * img_h))
                        if idx == 87:
                            lowerlip_2 = (int(landmarks.x * img_w), int(landmarks.y * img_h)) 
                        if idx == 312:
                            upperlip_3 = (int(landmarks.x * img_w), int(landmarks.y * img_h))
                        if idx == 317:
                            lowerlip_3 = (int(landmarks.x * img_w), int(landmarks.y * img_h))
                        if idx == 81:
                            upperlip_4 = (int(landmarks.x * img_w), int(landmarks.y * img_h))
                        if idx == 178:
                            lowerlip_4 = (int(landmarks.x * img_w), int(landmarks.y * img_h))
                        if idx == 311:
                            upperlip_5 = (int(landmarks.x * img_w), int(landmarks.y * img_h))
                        if idx == 402:
                            lowerlip_5 = (int(landmarks.x * img_w), int(landmarks.y * img_h))
                    face_2d = np.array(face_2d, dtype=np.float64)
                    face_3d = np.array(face_3d, dtype=np.float64)
                    focal_length = 1 * img_w
                    camera_matrix = np.array([[focal_length,0,img_h/2],
                                            [0,focal_length,img_w/2],
                                            [0,0,1]])
                    distortion_matrix = np.zeros((4,1),dtype=np.float64)
                    success,rotation_vector,translation_vector = cv2.solvePnP(face_3d, face_2d, camera_matrix, distortion_matrix)
                    rotational_matrix,jac = cv2.Rodrigues(rotation_vector)
                    angles, mtxR, mtxQ, Qx, Qy, Qz = cv2.RQDecomp3x3(rotational_matrix)
                    x = angles[0] * 360
                    y = angles[1] * 360
                    z = angles[2] * 360
                

                    if y < -17:
                        text = "Looking Left"
                        head_move += 1
                    elif y > 17:
                        text = "Looking Right"
                        head_move += 1
                    elif x < -14:
                        text = "Looking Down"
                        head_move += 1
                    elif x > 14:
                        text = "Looking Up"
                        head_move += 1
                    else:
                        text = "looking Forward"
                
                    lip_distance = (cal_distance(upperlip_1,lowerlip_1)
                                    + cal_distance(upperlip_2,lowerlip_2)
                                    + cal_distance(upperlip_3,lowerlip_3)
                                    + cal_distance(upperlip_4,lowerlip_4)
                                    + cal_distance(upperlip_5,lowerlip_5)) // 5
                    
                    if(lip_distance >= 8):
                        lip_text = "Talking" 
                        talk += 1
                    else:
                        lip_text = "not talking"
                
                    cv2.putText(image,lip_text,(5,70),cv2.FONT_HERSHEY_SIMPLEX,1,(255,0,0),1)
                    cv2.putText(image, text, (5, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255,0,0), 1)
                    # cv2.putText(image, "x: " + str(np.round(x,2)), (500, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
                    # cv2.putText(image, "y: " + str(np.round(y,2)), (500, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
                    # cv2.putText(image, "z: " + str(np.round(z,2)), (500, 150), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
                    # mp_drawing.draw_landmarks(image=image,
                    #                         landmark_list=keypoints.multi_face_landmarks[0],
                    #                         landmark_drawing_spec=drawing_spec,
                    #                         connection_drawing_spec=drawing_spec)
            object = phone_detection()
            phone = object.result(image)
            if not phone:
                phone_sus += 1
                cv2.rectangle(image,(phone[0],phone[1]),(phone[2],phone[3]),(0,0,255),1,1)
                cv2.putText(image,"phone detected",(5,100),cv2.FONT_HERSHEY_TRIPLEX,1,(255,0,0),1)
            ret,buffer = cv2.imencode(".jpg",image)
            image = buffer.tobytes()
            yield (b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + image + b'\r\n')
        except:
            continue     
    capture.release()
    cv2.destroyAllWindows()

def stopcamera(): 
    capture.release()
    cv2.destroyAllWindows()


class Hello(Resource):
    def get(self):
      return jsonify({'message': 'hello world'})
    

class Start_Test(Resource):
    @cross_origin()
    def get(self):
        return Response(video_streaming(), mimetype='multipart/x-mixed-replace; boundary=frame')
    
class Stop_Test(Resource):
    @cross_origin()
    def post(self):
        stopcamera()
        return jsonify({"number of times no person detected" : not_detected,
                        "number of times many person detected" : many_person,
                        "numbers of time phone detected" : phone_sus,
                        "number of times head movement occured" : head_move,
                        "number of times talked" : talk})


api.add_resource(Hello,'/')
api.add_resource(Start_Test,'/start_test')
api.add_resource(Stop_Test,'/stop_test')





if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

