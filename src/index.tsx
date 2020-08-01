import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card, Typography, Button, Popconfirm } from "antd";
import Gallery, { PhotoProps } from "react-photo-gallery";
// import ReactPlayer from "react-player/lazy";
import ImageSelect from "./ImageSelect";
import "antd/dist/antd.css";
import "./index.css";

const { Title } = Typography;

const photos: PhotoProps[] = [
  {
    src: "/images/godness.png",
    width: 1.1,
    height: 1,
  },
  {
    src: "/images/login.jpg",
    width: 1.82,
    height: 1,
  },
  {
    src: "/images/lesson_details.jpg",
    width: 1,
    height: 1.43,
  },
  {
    src: "/images/oneplus_phone.png",
    width: 1,
    height: 2.13,
  },
  {
    src: "/images/poster.jpg",
    width: 2.1,
    height: 1,
  },
  {
    src: "/images/preview.png",
    width: 1,
    height: 1.97,
  },
  {
    src: "/images/work-together.jpg",
    height: 1,
    width: 1.82,
  },
  {
    src: "/images/yuns.jpg",
    height: 1,
    width: 1,
  },
  {
    src: "/images/zsakvo.jpg",
    height: 1,
    width: 1,
  },
  {
    src: "/images/skyball.jpg",
    height: 1,
    width: 1,
  },
  //   {
  //     src: "/videos/art_of_programming.mp4",
  //     width: 1.78,
  //     height: 1,
  //   },
];

const placeholder: PhotoProps = {
  src: "",
  width: 2,
  height: 1,
};

const App = () => {
  const [allImages, setAllImages] = useState<PhotoProps[]>(photos);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleSelect = (src: string) => {
    if (selectedImages.includes(src)) {
      setSelectedImages((oldVal) => oldVal.filter((item) => item !== src));
    } else {
      setSelectedImages((oldVal) => [...oldVal, src]);
    }
  };

  const handleDelete = () => {
    //make api call
    //clear selection & reload
    setAllImages((photos) =>
      photos.filter((item) => !selectedImages.includes(item.src))
    );
    setSelectedImages([]);
  };

  useEffect(() => {
    console.log(selectedImages);
  }, [selectedImages]);

  return (
    <div
      style={{
        margin: "30px auto",
        maxWidth: 1200,
        padding: 10,
      }}
    >
      <Title level={2} style={{ marginBottom: 30, textAlign: "center" }}>
        媒体资源管理
      </Title>
      <Card
        title={<Title level={4}>图片</Title>}
        extra={
          selectedImages.length ? (
            <Popconfirm
              title={`确认要删除这 ${selectedImages.length} 张图片吗?`}
              onConfirm={handleDelete}
            >
              <Button danger type="link">
                删除选中图片
              </Button>
            </Popconfirm>
          ) : null
        }
        style={{ marginBottom: 30 }}
      >
        {allImages.length > 0 ? (
          <Gallery
            photos={allImages.concat(placeholder)}
            renderImage={({ photo }) => (
              <ImageSelect
                key={photo.src}
                src={photo.src}
                width={photo.width}
                height={photo.height}
                style={{ margin: 2 }}
                selected={selectedImages.includes(photo.src)}
                onSelect={handleSelect}
              />
            )}
          />
        ) : (
          "没有图片可以显示"
        )}
      </Card>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
