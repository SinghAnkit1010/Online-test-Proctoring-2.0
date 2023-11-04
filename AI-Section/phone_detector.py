import cv2
import numpy as np

weights_path = "mobile_detector.onnx"
network = cv2.dnn.readNetFromONNX(weights_path)
class phone_detection:
    def result(self,image):
        blob = cv2.dnn.blobFromImage(image,1/255.0,(640,640),swapRB=True,crop=True)
        network.setInput(blob)
        output = network.forward()[0]
        class_ids = []
        confidences = []
        boxes = []
        rows = output.shape[0]
        image_height,image_width,_ = image.shape
        x_factor = image_width / 640
        y_factor =  image_height / 640
        for i in range(rows):
            row = output[i]
            confidence = row[4]
            if confidence >= 0.5:
                class_scores = row[5:]
                _,_,_,max_index = cv2.minMaxLoc(class_scores)
                class_id = max_index[1]
                if(class_scores[class_id] > 0.3):
                    confidences.append(confidence)
                    class_ids.append(class_id)
                    x,y,w,h = row[0].item(), row[1].item(), row[2].item(), row[3].item()
                    left = int((x - 0.5 * w) * x_factor)
                    top = int((y - 0.5 * h) * y_factor)
                    width = int(w * x_factor)
                    height = int(h * y_factor)
                    box = np.array([left,top,width,height])
                    boxes.append(box)
        indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.25, 0.45) 
        result_class_ids = []
        result_confidences = [] 
        result_boxes = []
        for i in indexes:
            result_confidences.append(confidences[i])
            result_class_ids.append(class_ids[i])
            result_boxes.append(boxes[i])
            if result_confidences is None:
                return 0
            else:
                return 1


