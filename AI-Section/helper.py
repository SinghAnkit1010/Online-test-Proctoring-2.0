import cv2
import mediapipe as mp
import numpy as np
import time

mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)

mp_drawing = mp.solutions.drawing_utils

drawing_spec = mp_drawing.DrawingSpec(thickness=1, circle_radius=1)
image = cv2.cvtColor(cv2.imread('IMG-20200609-WA0010.jpg'),cv2.COLOR_BGR2RGB)
results = face_mesh.process(image)
print(results)

# cap = cv2.VideoCapture(0)

# while cap.isOpened():
#     success, image = cap.read()

#     start = time.time()
#     image = cv2.cvtColor(cv2.flip(image, 1), cv2.COLOR_BGR2RGB)
#     image.flags.writeable = False
#     results = face_mesh.process(image)
#     image.flags.writeable = True
#     image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
img_h, img_w, img_c = image.shape
face_3d = []
face_2d = []
if results.multi_face_landmarks:
    for face_landmarks in results.multi_face_landmarks:
        for idx, lm in enumerate(face_landmarks.landmark):
            if idx == 33 or idx == 263 or idx == 1 or idx == 61 or idx == 291 or idx == 199:
                if idx == 1:
                    nose_2d = (lm.x * img_w, lm.y * img_h)
                    nose_3d = (lm.x * img_w, lm.y * img_h, lm.z * 3000)

                x, y = int(lm.x * img_w), int(lm.y * img_h)

                    # Get the 2D Coordinates
                face_2d.append([x, y])

                    # Get the 3D Coordinates
                face_3d.append([x, y, lm.z])       
            
#             # Convert it to the NumPy array
        face_2d = np.array(face_2d, dtype=np.float64)

#             # Convert it to the NumPy array
        face_3d = np.array(face_3d, dtype=np.float64)

#             # The camera matrix
        focal_length = 1 * img_w

        cam_matrix = np.array([ [focal_length, 0, img_h / 2],
                                [0, focal_length, img_w / 2],
                                [0, 0, 1]])

#             # The distortion parameters
        dist_matrix = np.zeros((4, 1), dtype=np.float64)

#             # Solve PnP
        success, rot_vec, trans_vec = cv2.solvePnP(face_3d, face_2d, cam_matrix, dist_matrix)

#             # Get rotational matrix
        rmat, jac = cv2.Rodrigues(rot_vec)

#             # Get angles
        angles, mtxR, mtxQ, Qx, Qy, Qz = cv2.RQDecomp3x3(rmat)

#             # Get the y rotation degree
        x = angles[0] * 360
        y = angles[1] * 360
        z = angles[2] * 360
          

            # See where the user's head tilting
        if y < -8:
            text = "Looking Left"
        elif y > 8:
            text = "Looking Right"
        elif x < -8:
            text = "Looking Down"
        elif x > 8:
            text = "Looking Up"
        else:
            text = "Forward"
print(text)
# cv2.putText(image,text,(0,0),1,1,(0,255,0))
# cv2.imwrite('image.jpg',image)
