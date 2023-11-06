import cv2
import numpy as np
import onnx
import onnxruntime

# weights_path = "mobile_detector.onnx"
# network = cv2.dnn.readNetFromONNX(weights_path)
class phone_detection:
    def result(self,image):
        # blob = cv2.dnn.blobFromImage(image,1/255.0,(640,640),swapRB=True,crop=True)
        # network.setInput(blob)
        # output = network.forward()[0]
        img = cv2.resize(image,(640,640))
        img = img.astype('float32') / 255.0
        path = 'AI-Section/best.onnx'
        image_transposed = np.transpose(img, (2, 0, 1))
        model_input = np.expand_dims(image_transposed,axis = 0)
        session = onnxruntime.InferenceSession(path,None)
        inputs_name = session.get_inputs()[0].name
        outputs_name = session.get_outputs()[0].name
        predictions = session.run([outputs_name],{inputs_name:model_input})[0]
        class_ids = []
        confidences = []
        boxes = []
        outputs = predictions[0]
        anchors = outputs.shape[0]
        height,width,_ = image.shape
        x_factor = width / 640
        y_factor =  height / 640
        for i in range(anchors):
            anchor_output = outputs[i]
            confidence = anchor_output[4]
            if confidence >= 0.6:
                class_scores = anchor_output[5:]
                _,_,_,max_index = cv2.minMaxLoc(class_scores)
                class_id = max_index[1]
                if(class_scores[class_id] > 0.35):
                    confidences.append(confidence)
                    class_ids.append(class_id)
                    x,y,w,h = anchor_output[0].item(), anchor_output[1].item(), anchor_output[2].item(), anchor_output[3].item()
                    x_min = int((x - (w/2))*x_factor)
                    y_min = int((y - (h/2))*y_factor)
                    x_max = int(x + w*x_factor)
                    y_max = int(y + h*y_factor)
                    boxes.append(np.array([x_min,y_min,x_max,y_max]))
        indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.35, 0.45) 
        result_class_ids = []
        result_confidences = [] 
        result_boxes = []
        for i in indexes:
            result_confidences.append(confidences[i])
            result_class_ids.append(class_ids[i])
            result_boxes.append(boxes[i]) 
        if not result_confidences:
            return None
        else:
            x1,y1,x2,y2 = result_boxes[0][0],result_boxes[0][1],result_boxes[0][2],result_boxes[0][3]
            return [x1,y1,x2,y2]


