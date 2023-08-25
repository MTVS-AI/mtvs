import base64
import pandas as pd
import folium
import numpy as np
from PIL import Image

class MapManager:
    def __init__(self, df_report):
        self.df = df_report
        self.locations = ['[37.3953946671528, 127.1093297131001]', '[37.39417823717656, 127.1093844115068]', '[37.39271861487178, 127.10934841208203]', '[37.39185066864326, 127.11250910446297]', '[37.39345442116072, 127.11257925899302]', '[37.395544745716585, 127.11262755830957]', '[37.39650119524654, 127.111183435904]', '[37.39649911490269, 127.11337434990375]', '[37.39601079572209, 127.11520313115568]', '[37.39440567382231, 127.11653325709659]', '[37.39346684071838, 127.11831608687358]', '[37.39080112282156, 127.11700196362115]', '[37.39188034187261, 127.119013740367]', '[37.3940362949143, 127.10695620640082]', '[37.396431672499325, 127.10842774919402]', '[37.397943736734206, 127.11021431692127]']
        self.load_df_report['Location'] = self.locations

    # origin_img를 저장하고, 경로 추출
    def load_origin_img_path(self, idx):
        origin_img = self.df.loc[idx, 'Origin_img'][0]
        origin_img = np.array(origin_img,dtype=np.uint8)
        img = Image.fromarray(origin_img)
        img_path = './origin_img.jpg'
        # os.makedirs(img_path, exist_ok=True)
        img.save(img_path, 'jpeg')
        print("load_origin_img")
        return img_path

    # detect_img를 저장하고, 경로 추출
    def load_detect_img_path(self, idx):
        detect_img = self.df.loc[idx, 'Detect_img']
        detect_img = np.array(detect_img,dtype=np.uint8)
        img = Image.fromarray(detect_img)
        img_path = './detect_img.jpg'
        img.save(img_path, 'jpeg')
        print("load_detect")

        return img_path

    # crop된 이미지들을 저장하고, 경로 추출
    def load_crop_imgs_path(self,idx):
        crop_imgs = self.df.loc[idx]['Crop_imgs']
        n_crops = len(crop_imgs)
        crop_path_list = []

        for i in range(n_crops):
            crop_img = np.array(crop_imgs[i],dtype=np.uint8)
            img = Image.fromarray(crop_img)
            img_path = 'crop_images_' + str(i) + '.jpg'
            img.save(img_path, 'jpeg')
            crop_path_list.append(img_path)
        print("crop save")
        return crop_path_list

    # 모든 이미지 경로를 저장하고, 경로 추출
    def load_imgs_path(self, idx):
        base_path_list = []
        crop_path_list = []

        origin_img_path = self.load_origin_img_path(idx)
        detect_img_path = self.load_detect_img_path(idx)
        base_path_list.append(origin_img_path)
        base_path_list.append(detect_img_path)

        try:
            crop_path_list = self.load_crop_imgs_path(idx)
        except:
            pass
        print("extract")
        return base_path_list, crop_path_list

    # 저장된 이미지를 경로를 통해 불러온 후, html에 넣기 위해 base64 형식으로 인코딩한 다음 디코딩
    # 기본 이미지와 detect 이미지는 반드시 존재하지만, crop 이미지는 경우에 따라 존재하지 않을 수도 있어 함수를 나눔
    def get_base_pics(self, base_path_list):
        pic_base = []
        for img_path in base_path_list:
            pic = base64.b64encode(open(img_path, 'rb').read()).decode()
            pic_base.append(pic)
        print("divide")
        return pic_base

    # 저장된 이미지를 경로를 통해 불러온 후, html에 넣기 위해 base64 형식으로 인코딩한 다음 디코딩
    def get_crop_pics(self, crop_path_list):
        pic_crops = []
        try:
            for img_path in crop_path_list:
                pic = base64.b64encode(open(img_path, 'rb').read()).decode()
                pic_crops.append(pic)
        except:
            pass
        print("pic")
        return pic_crops

    # crop된 이미지들을 html 표 형식으로 시각화하는 함수
    def get_crop_htmls(self, idx, crop_path_list, pic_crops):
        htmls = []
        for i in range(len(crop_path_list)):
            if self.df.loc[idx]['Crop_classes'][i] == 'frame':
                category = self.df.loc[idx]['Category'][i]
                categories = {-1:'초기화', 0:'프레임', 1:'합법(공익)', 2:'정치', 3:'기타'}
                texts = self.df.loc[idx]['ClovaOCR_text'][i]
                basis = self.df.loc[idx]['Category_basis'][i]

                # 이미지 옆에 표 형태로 세부내용 넣기
                html = f"""
                <tr>
                    <td><img src="data:image/jpeg;base64,{pic_crops[i]}" width=200 height=100></td><td align=center>frame</td>
                    <td>
                    <table border width=650 height=95%>
                        <tr><td align=center width=40>범례</td><td>{categories[category]}</td></tr>
                        <tr><td align=center width=40>내용</td><td class=visible>{texts}</td></tr>
                        <tr><td align=center width=40>근거</td><td class=visible>{basis}</td></tr>
                    </table>
                    </td>
                </tr>
                """
                htmls.append(html)
            else:
                category = self.df.loc[idx]['Category'][i]
                categories = {-1:'초기화', 0:'프레임', 1:'합법(공익)', 2:'정치', 3:'기타'}
                texts = self.df.loc[idx]['ClovaOCR_text'][i]
                basis = self.df.loc[idx]['Category_basis'][i]

                # 이미지 옆에 표 형태로 세부내용 넣기
                html = f"""
                <tr>
                    <td>
                    <img src="data:image/jpeg;base64,{pic_crops[i]}" width=200 height=100></td><td align=center>crop_img_{i}</td>
                    <td>
                    <table border width=650 height=95%>
                        <tr><td align=center width=40>범례</td><td>{categories[category]}</td></tr>
                        <tr><td align=center width=40>내용</td><td class=visible>{texts}</td></tr>
                        <tr><td align=center width=40>근거</td><td class=visible>{basis}</td></tr>
                    </table>
                    </td>
                </tr>
                """
                htmls.append(html)
        print("map append")
        return htmls

    # popup에 html표를 집어넣기
    def get_folium_popups(self, idx):
        base_path_list, crop_path_list = self.load_imgs_path(idx)
        pic_base = self.get_base_pics(base_path_list)
        pic_crops = self.get_crop_pics(crop_path_list)

        base_h = len(pic_base) * 100
        crop_h = len(self.df.loc[idx]['Crop_classes']) * 100  # 만약 banner나 frame을 detect하지 못했다면 popup창의 크기를 조절

        crop_html = f''
        try:
            htmls = self.get_crop_htmls(self.df, idx, crop_path_list, pic_crops)
            if htmls != []:
                for i in range(len(htmls)):
                    crop_html += htmls[i] + '\n'
        except:
            pass

        # 원본 이미지와 detect 이미지는 고정적으로 들어감
        image_tag = f"""
        <head>
        <meta charset="euc-kr">
        <link rel="stylesheet" href="">
        <style src="">
        </style>
        </head>
        <body>
            <div>
            <table border=2>
                <tr align=center>
                    <th>이미지</th>
                    <th>종류</th>
                    <th>내용</th>
                </tr>
                <tr>
                    <td><img src="data:image/jpeg;base64,{pic_base[0]}" width=200 height=100></td><td align=center width=75>Origin Image</td><td align=center>원본 이미지</td>
                </tr>
                <tr>
                    <td><img src="data:image/jpeg;base64,{pic_base[1]}" width=200 height=100></td><td align=center width=75>Detect Image</td><td align=center>YOLO로 Detect한 이미지</td>
                </tr>
        """ + crop_html + """
        </body>
        """

        iframe = folium.IFrame(image_tag, width=1000, height=150+base_h+crop_h)
        popup = folium.Popup(iframe)
        print("popup")
        return popup