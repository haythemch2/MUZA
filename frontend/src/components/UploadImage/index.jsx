import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { editProfile, getcurrent } from "../js/action/user";
import { getUserPosts } from "../js/action/post";
import ReactAudioPlayer from "react-audio-player";
import Player from "../components/Player";
import ImageGallery from "react-image-gallery";
import { Upload, Modal, Table, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import ReactPlayer from "react-player";
import moment from "moment";
import { QRCodeSVG } from "qrcode.react";
import face from "../assets/facebook.png";
import ig from "../assets/Instagram.png";
import tw from "../assets/twitter.png";
import tik from "../assets/tiktok.png";
import snap from "../assets/snap.png";
import spo from "../assets/spotify.png";
import dee from "../assets/deezer.png";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";

let URI = process.env.REACT_APP_API;

function makeId(length = 5) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const Profile = () => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
  // edit post ,  delte post
  const handledelte = (id) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    axios.delete(URI + "/delete/" + id, options);
    setDummy("77");
  };
  const [newImage, setNewImage] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedPost, setEditedPost] = useState({
    img: "",
  });
  const uploadImg = (el) => {
    const data = new FormData();
    data.append("file", newImage);
    data.append("upload_preset", "ywtxhaze");
    data.append("cloud_name", "dh8bgpvun");
    fetch("https://api.cloudinary.com/v1_1/dh8bgpvun/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then(async (data) => {
        setEditedPost({ ...editedPost, img: data.url });
        await axios
          .put(URI + "/update/" + el._id, {
            img: data.url,
            title: editedPost.title || el.title,
            body: editedPost.body || el.body,
          })
          .then((e) => setDummy("4"));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditedPost = () => {
    setIsModalVisible(true);
  };

  const handleOk = (el) => {
    uploadImg(el);

    setIsModalVisible(false);
  };

  const handleCancelEdit = () => {
    setIsModalVisible(false);
  };
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setNewImage(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  //show more
  const [showItems, setShowItems] = useState(6);
  const handleLoadMore = () => {
    setShowItems(showItems + 6);
  };
  //******** */
  const navigate = useNavigate();
  const myPosts = useSelector((state) => state.postReducer.posts);
  const loadPosts = useSelector((state) => state.postReducer.loadPosts);

  const [reservs, setReservs] = useState([]);
  const [play, setplay] = useState(false);

  const [selectedAudio, setSelectedAudio] = useState(
    "http://example.com/audio.mp3"
  );

  const [socialVisible, setSocialVisible] = useState(false);
  const [socialConfirmLoading, setSocialConfirmLoading] = useState(false);
  const [socialmodalText, setSocialModalText] = useState(
    "Content of the modal"
  );
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [snapchat, setSnapChat] = useState("");
  const [spotify, setSpotify] = useState("");
  const [deezer, setDeezer] = useState("");

  const [youtubeUrls, setYoutubeUrls] = useState([]);
  const current = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    dispatch(getUserPosts());
    dispatch(getcurrent());
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    let URI = process.env.REACT_APP_API;
    console.log(URI, "URI");
    axios
      .get(URI + "/myImages", options)
      .then((res) => {
        setmyImages([...res.data.myImages]);
        let imgs = res.data.myImages.map((e) => ({
          uid: e._id,
          name: "xxx.png",
          status: "done",
          url: e.url,
        }));
        let Ids = res.data.myImages.map((e) => e._id);
        setFileList(imgs);
        setFileIdsList(Ids);
      })
      .catch((err) => console.log(err));
    if (current?.role == "maison" || "studio") {
      axios.get(URI + "/reservation/getByReservedFor", options).then((res) => {
        console.log(res.data);
        setReservs([...res.data]);
      });
    }
    axios
      .get(URI + "/video/get?id=" + current?._id, options)
      .then((res) => {
        setYoutubeUrls(
          res.data.map((e) => ({
            value: e.url,
            id: e._id,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dummy]);
  useEffect(async () => {
    if (!current) {
      dispatch(getcurrent());
    }
    if (youtubeUrls.length === 0 && current) {
      const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      try {
        let result = await axios.get(
          URI + "/video/get?id=" + current._id,
          options
        );

        setYoutubeUrls(
          result.data.map((e) => ({
            value: e.url,
            id: e._id,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    }
  }, [dummy, current]);
  const showModalSocial = () => {
    setSocialVisible(true);
  };

  const handleOkSocial = () => {
    setSocialModalText("The modal will be closed after two seconds");
    setSocialConfirmLoading(true);
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    axios.put(
      URI + "/setSocialMedia",
      {
        facebook: facebook,
        instagram: instagram,
        twitter: twitter,
        snapchat: snapchat,
        tiktok: tiktok,
        spotify: spotify,
        deezer: deezer,
      },
      options
    );
    setTimeout(() => {
      setSocialVisible(false);
      setSocialConfirmLoading(false);
    }, 2000);
  };

  const handleCancelSocial = () => {
    console.log("Clicked cancel button");
    setSocialVisible(false);
  };
  //** */
  const [myImages, setmyImages] = useState([]);

  const handlePlay = (src) => {
    setplay(true);
    setSelectedAudio(src);
  };

  const [toChange, setToChange] = useState({
    name: "",
    email: "",
    url: "",
    phone: "",
    description: "",
  });
  const [image, setImage] = useState("");
  const [imageUrl, setimageUrl] = useState(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    setToChange({
      name: current?.name,
      email: current?.email,
      url: current?.url,
      phone: current?.phone,
      description: current?.description,
      facebook: current?.facebook,
      instagram: current?.instagram,
      twitter: current?.twitter,
    });
  }, [current]);
  const handleChange = (e) => {
    e.preventDefault();
    setToChange({ ...toChange, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    uploadPic();
  }, [image]);
  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ywtxhaze");
    data.append("cloud_name", "dh8bgpvun");
    fetch("https://api.cloudinary.com/v1_1/dh8bgpvun/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setimageUrl(data.url);
        console.log(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = () => {
    dispatch(editProfile(current._id, { ...toChange, url: imageUrl }));
    navigate("/profile");
  };

  const saveUserVideos = () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    Promise.all(
      youtubeUrls.map((url) => {
        axios
          .post(
            URI + "/video/",
            {
              url,
            },
            options
          )
          .then((e) => {});
      })
    )
      .then((res) => {
        console.log("c bon");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //////////////////////////////:GALERIE////////////////////////
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [dummy, setDummy] = useState("");
  const [fileIdsList, setFileIdsList] = useState([]);
  console.log(fileList);
  const uploadimg = (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ywtxhaze");
    data.append("cloud_name", "dh8bgpvun");
    return fetch("https://api.cloudinary.com/v1_1/dh8bgpvun/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((cloudinaryResponse) => {
        return axios.post(
          URI + "/uploadImage",
          {
            url: cloudinaryResponse.url,
          },
          options
        );
      })
      .then((serverResponse) => {
        return {
          file,
          ...serverResponse.data,
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    //   uploadimg(file);
  };

  const handleChangeIMG = ({ fileList }) => {
    setFileList(fileList);
  };

  const onRemove = (file) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);

    const newFileIdsList = fileIdsList.slice();
    axios.post(
      URI + `/image/deleteImages/`,
      { imageId: newFileIdsList[index] },
      options
    );

    newFileIdsList.splice(index, 1);
    setFileIdsList(newFileIdsList);
    return {
      fileList: newFileList,
    };
  };

  const handleDeleteVideo = (vid) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    axios
      .post(
        URI + "/video/delete",
        { value: vid, user_id: current._id },
        options
      )
      .then((res) => {
        console.log("sayé");
      })
      .catch((err) => console.log(err));
  };

  const beforeUpload = (file) => {
    let newfileList = [...fileList, file];
    setFileList(newfileList);
    uploadimg(file).then((uploadResult) => {
      setFileIdsList([...fileIdsList, uploadResult.imageId]);
    });
    return false;
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  //////////////////////////RESERVATION////////////////////////////

  const handleAcceptReserv = (reservationId) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    axios
      .post(
        URI + "/reservation/edit",
        { reservationId, state: "ACCEPTED" },
        options
      )
      .then((res) => {
        console.log("c bon");
        window.location.reload();
      });
  };
  const handleDeclineReserv = (reservationId) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    axios
      .post(
        URI + "/reservation/edit",
        { reservationId, state: "REJECTED" },
        options
      )
      .then((res) => {
        window.location.reload();
      });
  };
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text, record) => (
        <span>{moment(text).format("DD/MM/YYYY HH:mm")}</span>
      ),
    },
    {
      title: "Prénom",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nom",
      dataIndex: "lastName",
      key: "prénom",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telephone",
      dataIndex: "tel",
      key: "telephone",
    },

    {
      title: "#",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) =>
        record.state == "PENDING" ? (
          <Space size="middle">
            <a
              style={{ color: "green" }}
              onClick={() => handleAcceptReserv(record._id)}
            >
              Accepter
            </a>
            <a
              style={{ color: "red" }}
              onClick={() => handleDeclineReserv(record._id)}
            >
              Refuser
            </a>
          </Space>
        ) : (
          <a>{record.state}</a>
        ),
    },
  ];
  return (
    <div id="main" className="layout-row flex">
      {play && <Player src={selectedAudio} />}
      {/* ############ Content START*/}
      <div id="content" className="flex">
        {/* ############ Main START*/}
        <div>
          <div className="page-content page-container" id="page-content">
            <div className="padding sr">
              <div
                className="page-hero"
                data-id={2}
                data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/07/2c/59/072c59fe-549d-bd0e-f93d-3e4a1f673af5/mzaf_4035597378145374075.plus.aac.p.m4a"
              >
                <div className="media bg-media">
                  <div
                    className="media-content"
                    style={{ backgroundImage: "url(../assets/img/b10.jpg)" }}
                  />
                </div>

                <div className="pos-rlt flexRows">
                  <div>
                    <div className="col-6">
                      <img
                        src={imageUrl || toChange.url}
                        width="150"
                        height="150"
                        style={{ borderRadius: "50%" }}
                      />
                      <div class="file-input">
                        <input
                          type="file"
                          name="file-input"
                          id="file-input"
                          class="file-input__input"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                        <label class="file-input__label" for="file-input">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="upload"
                            class="svg-inline--fa fa-upload fa-w-16"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                            ></path>
                          </svg>
                          <span>Modifier</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <h1 className="display-3 font-weight-bold text-white">
                        {toChange.name}
                      </h1>
                    </div>

                    <span className="hide title">Shallow</span>
                    <span className="hide subtitle">
                      Lady Gaga &amp; Bradley Cooper
                    </span>
                    <div className="py-4 toolbar align-items-center">
                      <button
                        className="btn btn-icon btn-play btn-rounded gd-primary"
                        data-toggle-class=""
                      />
                      <span className="text-muted">
                        {myPosts?.length} tracks
                      </span>
                      <span className="text-muted">
                        {current?.followers?.length} follower
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-muted">Social: </span>
                      <a onClick={showModalSocial}>
                        <img src={face} width="32" className="ml-2" />
                      </a>
                      <a onClick={showModalSocial}>
                        <img src={ig} width="32" className="ml-2" />
                      </a>
                      <a onClick={showModalSocial}>
                        <img src={tw} width="32" className="ml-2" />
                      </a>
                      <a onClick={showModalSocial}>
                        <img src={snap} width="32" className="ml-2" />
                      </a>
                      <a onClick={showModalSocial}>
                        <img src={tik} width="32" className="ml-2" />
                      </a>
                      <a onClick={showModalSocial}>
                        <img src={spo} width="32" className="ml-2" />
                      </a>
                      <a onClick={showModalSocial}>
                        <img src={dee} width="32" className="ml-2" />
                      </a>
                      <Modal
                        title="Modifier vos liens de réseaux sociaux"
                        visible={socialVisible}
                        onOk={handleOkSocial}
                        confirmLoading={socialConfirmLoading}
                        onCancel={handleCancelSocial}
                      >
                        <div>
                          <div
                            style={{
                              width: "100%",
                              height: "40px",
                              backgroundColor: "rgb(241, 241, 241)",
                              borderRadius: "15px",
                              marginBottom: "8px",
                              display: "flex",
                            }}
                          >
                            <img
                              src={face}
                              width="24"
                              height="24"
                              style={{ margin: "auto" }}
                            />
                            <input
                              style={{
                                width: "92%",
                                height: "40px",
                                border: "none",
                                outline: "none",
                                backgroundColor: "rgb(241, 241, 241)",
                                padding: "5px",
                              }}
                              type="text"
                              placeholder={current?.facebook}
                              onChange={(e) => setFacebook(e.target.value)}
                            />
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "40px",
                              backgroundColor: "rgb(241, 241, 241)",
                              borderRadius: "15px",
                              marginBottom: "8px",
                              display: "flex",
                            }}
                          >
                            <img
                              src={ig}
                              width="24"
                              height="24"
                              style={{ margin: "auto" }}
                            />
                            <input
                              style={{
                                width: "92%",
                                height: "40px",
                                border: "none",
                                outline: "none",
                                backgroundColor: "rgb(241, 241, 241)",
                                padding: "5px",
                              }}
                              type="text"
                              placeholder={current?.instagram}
                              onChange={(e) => setInstagram(e.target.value)}
                            />
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "40px",
                              backgroundColor: "rgb(241, 241, 241)",
                              borderRadius: "15px",
                              marginBottom: "8px",
                              display: "flex",
                            }}
                          >
                            <img
                              src={tw}
                              width="24"
                              height="24"
                              style={{ margin: "auto" }}
                            />
                            <input
                              style={{
                                width: "92%",
                                height: "40px",
                                border: "none",
                                outline: "none",
                                backgroundColor: "rgb(241, 241, 241)",
                                padding: "5px",
                              }}
                              type="text"
                              placeholder={current?.twitter}
                              onChange={(e) => setTwitter(e.target.value)}
                            />
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "40px",
                              backgroundColor: "rgb(241, 241, 241)",
                              borderRadius: "15px",
                              marginBottom: "8px",
                              display: "flex",
                            }}
                          >
                            <img
                              src={snap}
                              width="24"
                              height="24"
                              style={{ margin: "auto" }}
                            />
                            <input
                              style={{
                                width: "92%",
                                height: "40px",
                                border: "none",
                                outline: "none",
                                backgroundColor: "rgb(241, 241, 241)",
                                padding: "5px",
                              }}
                              type="text"
                              placeholder={current?.snapchat}
                              onChange={(e) => setSnapChat(e.target.value)}
                            />
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "40px",
                              backgroundColor: "rgb(241, 241, 241)",
                              borderRadius: "15px",
                              marginBottom: "8px",
                              display: "flex",
                            }}
                          >
                            <img
                              src={tik}
                              width="24"
                              height="24"
                              style={{ margin: "auto" }}
                            />
                            <input
                              style={{
                                width: "92%",
                                height: "40px",
                                border: "none",
                                outline: "none",
                                backgroundColor: "rgb(241, 241, 241)",
                                padding: "5px",
                              }}
                              type="text"
                              placeholder={current?.tiktok}
                              onChange={(e) => setTiktok(e.target.value)}
                            />
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "40px",
                              backgroundColor: "rgb(241, 241, 241)",
                              borderRadius: "15px",
                              marginBottom: "8px",
                              display: "flex",
                            }}
                          >
                            <img
                              src={spo}
                              width="24"
                              height="24"
                              style={{ margin: "auto" }}
                            />
                            <input
                              style={{
                                width: "92%",
                                height: "40px",
                                border: "none",
                                outline: "none",
                                backgroundColor: "rgb(241, 241, 241)",
                                padding: "5px",
                              }}
                              type="text"
                              placeholder={current?.spotify}
                              onChange={(e) => setSpotify(e.target.value)}
                            />
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "40px",
                              backgroundColor: "rgb(241, 241, 241)",
                              borderRadius: "15px",
                              marginBottom: "8px",
                              display: "flex",
                            }}
                          >
                            <img
                              src={dee}
                              width="24"
                              height="24"
                              style={{ margin: "auto" }}
                            />
                            <input
                              style={{
                                width: "92%",
                                height: "40px",
                                border: "none",
                                outline: "none",
                                backgroundColor: "rgb(241, 241, 241)",
                                padding: "5px",
                              }}
                              type="text"
                              placeholder={current?.deezer}
                              onChange={(e) => setDeezer(e.target.value)}
                            />
                          </div>
                        </div>
                      </Modal>
                    </div>
                    <div
                      className="mb-2"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className="text-muted">Name</span>
                      <input
                        className="my_in"
                        type="text"
                        placeholder="name"
                        value={toChange.name}
                        name="name"
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className="mb-2"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className="text-muted">Email: </span>
                      <input
                        className="my_in"
                        type="text"
                        placeholder="email"
                        value={toChange.email}
                        name="email"
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className="mb-2 "
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className="text-muted">Telephone: </span>
                      <input
                        className="my_in"
                        type="text"
                        placeholder="Telephone"
                        value={toChange.phone}
                        name="phone"
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className="mb-2"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className="text-muted">Description: </span>
                      <input
                        className="my_in"
                        type="text"
                        placeholder="description"
                        value={toChange.description}
                        name="description"
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      className="btn waves-effect blue darken-1 mt-3"
                      onClick={() => handleEdit()}
                    >
                      Enregistrer
                    </button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      flexDirection: "row",
                    }}
                  >
                    <div className="list-content p-5 text-center">
                      <div className="list-body">
                        <a className="list-title title ajax h3 font-weight-bold">
                          Partager moi
                        </a>
                        <QRCodeSVG
                          value={`http://141.94.77.9/music/#/user/${current?._id}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-md-flex pos-rlt">
                <div className="flex">
                  <div className="d-flex">
                    <ul className="nav nav-sm text-sm nav-pills nav-rounded py-4">
                      <li className="nav-item" onFocus={() => setDummy("1")}>
                        <a
                          className="nav-link active"
                          href="#overview"
                          data-toggle="tab"
                        >
                          Presentation
                        </a>
                      </li>
                      <li className="nav-item" onFocus={() => setDummy("2")}>
                        <a
                          className="nav-link"
                          href="#tracks"
                          data-toggle="tab"
                        >
                          Galerie
                        </a>
                      </li>

                      <li className="nav-item" onFocus={() => setDummy("4")}>
                        <a
                          className="nav-link"
                          href="#youtube"
                          data-toggle="tab"
                        >
                          Youtube
                        </a>
                      </li>
                      {current?.role === "maison" ||
                      current?.role === "studio" ? (
                        <li className="nav-item" onFocus={() => setDummy("5")}>
                          <a
                            className="nav-link"
                            href="#reservation"
                            data-toggle="tab"
                          >
                            Reservations
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                      {/* <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#playlist"
                          data-toggle="tab"
                        >
                          Playlist
                        </a>
                      </li> */}
                    </ul>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="overview">
                      <div className="heading pt-5 pb-3 d-flex">
                        <div>
                          <div className="text-muted sr-item">Popular</div>
                          <h5 className="text-highlight sr-item">Tracks</h5>
                        </div>
                        <span className="flex" />
                      </div>
                      <div className="row list-row list-index">
                        {loadPosts ? (
                          <div className="progress">
                            <div className="indeterminate"></div>
                          </div>
                        ) : (
                          myPosts.slice(0, showItems).map((el) => (
                            <div className="col-12" data-source={el.url}>
                              <div className="list-item r">
                                <div
                                  className="media"
                                  onClick={() => handlePlay(el.url)}
                                >
                                  <a
                                    className="ajax media-content"
                                    style={{
                                      backgroundImage: "url(" + el.img + ")",
                                    }}
                                  ></a>
                                  <div className="media-action media-action-overlay">
                                    <Icon.PlayCircle
                                      size={64}
                                      color="#a6138c"
                                    />

                                    <button
                                      className="btn btn-icon no-bg no-shadow hide-row btn-more"
                                      data-toggle="dropdown"
                                    >
                                      <Icon.MoreHorizontal />{" "}
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right" />
                                  </div>
                                </div>
                                <div className="list-content text-center">
                                  <div className="list-body">
                                    <a className="list-title title ajax h-1x">
                                      {el.title}
                                    </a>
                                    <a className="list-subtitle d-block text-muted h-1x subtitle ajax">
                                      {el.body}
                                    </a>
                                  </div>
                                </div>
                                <div className="list-action show-row">
                                  <div className="d-flex align-items-center">
                                    <div className="px-3 text-sm text-muted d-none d-md-block">
                                      03:24
                                    </div>
                                    <button
                                      className="btn btn-icon no-bg no-shadow"
                                      data-toggle-class=""
                                    >
                                      <i
                                        data-feather="heart"
                                        className="active-primary"
                                      />
                                    </button>
                                    <button
                                      className="btn btn-icon no-bg no-shadow btn-more"
                                      data-toggle="dropdown"
                                    >
                                      <Icon.MoreHorizontal />{" "}
                                    </button>
                                    <div
                                      className="dropdown-menu dropdown-menu-right"
                                      style={{
                                        padding: "10px",
                                        fontSize: "22px",
                                        borderRadius: "20px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-around",
                                        }}
                                      >
                                        <EditFilled
                                          onClick={handleEditedPost}
                                        />

                                        <DeleteOutlined
                                          onClick={() => {
                                            handledelte(el._id);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Modal
                                title="Modifier track"
                                visible={isModalVisible}
                                onOk={() => handleOk(el)}
                                onCancel={handleCancelEdit}
                              >
                                <div
                                  style={{
                                    display: "flex",

                                    width: "20%",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <img
                                    src={imgData || el.img}
                                    alt="img"
                                    width="80px"
                                  />
                                  <div class="file-input">
                                    <label
                                      class="file-input__label"
                                      for="file-input2"
                                    >
                                      <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="upload"
                                        class="svg-inline--fa fa-upload fa-w-16"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                                        ></path>
                                      </svg>
                                      <span>Image</span>
                                    </label>
                                    <input
                                      type="file"
                                      name="file-input2"
                                      id="file-input2"
                                      class="file-input__input"
                                      onChange={onChangePicture}
                                    />
                                  </div>
                                </div>
                                <div style={{ marginTop: "8px" }}>
                                  <label
                                    style={{
                                      fontSize: "18px",
                                      fontWeight: "600",
                                      letterSpacing: "1.5px",
                                    }}
                                  >
                                    Titre:
                                  </label>
                                  <input
                                    style={{
                                      width: "100%",
                                      backgroundColor: "rgb(241, 241, 241)",
                                      border: "none",
                                      height: "40px",
                                      padding: "5px",
                                      fontSize: "18px",
                                      borderRadius: "5px",
                                    }}
                                    type="text"
                                    defaultValue={el.title}
                                    placeholder="Entre le nouveau titre..."
                                    onChange={(e) =>
                                      setEditedPost({
                                        ...editedPost,
                                        title: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div style={{ marginTop: "8px" }}>
                                  <label
                                    style={{
                                      fontSize: "18px",
                                      fontWeight: "600",
                                      letterSpacing: "1.5px",
                                    }}
                                  >
                                    Description:
                                  </label>
                                  <input
                                    style={{
                                      width: "100%",
                                      backgroundColor: "rgb(241, 241, 241)",
                                      border: "none",
                                      height: "40px",
                                      padding: "5px",
                                      fontSize: "18px",
                                      borderRadius: "5px",
                                    }}
                                    type="text"
                                    defaultValue={el.body}
                                    placeholder="Entre le nouveau description..."
                                    onChange={(e) =>
                                      setEditedPost({
                                        ...editedPost,
                                        body: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </Modal>
                            </div>
                          ))
                        )}
                        {showItems <= myPosts.length ? (
                          <button
                            class="btn btn-primary"
                            style={{ margin: "auto" }}
                            onClick={handleLoadMore}
                          >
                            Afficher Plus
                          </button>
                        ) : null}
                      </div>
                    </div>
                    <div className="tab-pane fade" id="tracks">
                      <div className="container">
                        <div
                          className="col-12"
                          data-id={438387803}
                          data-category="Dance"
                          data-tag="Other"
                          data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/23/17/88/23178814-ef4f-1b4d-294d-89cd434941a2/mzaf_8868960744652419987.plus.aac.p.m4a"
                        >
                          {/* <ImageGallery items={images} /> */}
                          <>
                            <h3>Galerie</h3>
                            <Upload
                              listType="picture-card"
                              fileList={fileList}
                              onPreview={handlePreview}
                              onChange={handleChangeIMG}
                              onRemove={onRemove}
                              beforeUpload={beforeUpload}
                            >
                              {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            <Modal
                              visible={previewVisible}
                              title={previewTitle}
                              footer={null}
                              onCancel={handleCancel}
                            >
                              <img
                                alt="example"
                                style={{ width: "100%" }}
                                src={previewImage}
                              />
                            </Modal>
                          </>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="albums">
                      <div className="row list mb-4">
                        {/* <div className="col-4 col-sm-3">
                          <div className="list-item list-hover r mb-4">
                            <div className="media">
                              <a
                                href="item.detail.html#402107013"
                                className="ajax media-content"
                                style={{
                                  backgroundImage: "url(../assets/img/c15.jpg)",
                                }}
                              ></a>
                              <div className="media-action media-action-overlay">
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row"
                                  data-toggle-class=""
                                >
                                  <i
                                    data-feather="heart"
                                    className="active-fill"
                                  />
                                </button>
                                <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row btn-more"
                                  data-toggle="dropdown"
                                >
                                  <Icon.MoreHorizontal />{" "}
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" />
                              </div>
                            </div>
                            <div className="list-content text-center">
                              <div className="list-body">
                                <a
                                  href="item.detail.html#402107013"
                                  className="list-title title ajax h-1x"
                                >
                                  Later Bitches
                                </a>
                                <a
                                  href="artist.detail.html#402107013"
                                  className="list-subtitle d-block text-muted h-1x subtitle ajax"
                                >
                                  The Prince Karma
                                </a>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="tab-pane fade" id="reservation">
                      {/* <div className="row list mb-4">
                        
                      </div> */}
                      <Table columns={columns} dataSource={reservs} />
                    </div>
                    <div className="tab-pane fade" id="youtube">
                      <div className="container">
                        <div
                          style={{
                            color: "black",
                          }}
                        >
                          <>
                            {youtubeUrls.map((v, k) => (
                              <div
                                key={k}
                                style={{
                                  marginTop: "2rem",
                                  borderBottom: "1px solid grey",
                                  padding: "10px",
                                }}
                              >
                                {
                                  <div key={youtubeUrls[k].id}>
                                    <input
                                      placeholder="youtube URL ..."
                                      value={youtubeUrls[k]?.value}
                                      style={{
                                        border: "none",
                                        paddingLeft: 15,
                                        fontSize: "22px",
                                        width: "57%",
                                        backgroundColor: "rgba(1,1,1,0.3)",
                                        color: "#2196F3",
                                      }}
                                      onChange={(e) => {
                                        setYoutubeUrls(
                                          youtubeUrls.map((v_, k_) =>
                                            k === k_
                                              ? {
                                                  id: v_.id,
                                                  value: e.target.value,
                                                }
                                              : v_
                                          )
                                        );
                                      }}
                                    />
                                    <div
                                      style={{
                                        position: "relative",
                                        width: "fit-content",
                                      }}
                                    >
                                      <Icon.Delete
                                        color="grey"
                                        style={{
                                          position: "absolute",
                                          top: "-10",
                                          right: "-20px",
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          setYoutubeUrls(
                                            youtubeUrls.filter(
                                              (v_, k_) => k !== k_
                                            )
                                          );
                                          handleDeleteVideo(v.value);
                                        }}
                                      />
                                      <ReactPlayer
                                        url={youtubeUrls[k].value}
                                        light={true}
                                        config={{
                                          youtube: {
                                            playerVars: { showinfo: 1 },
                                          },
                                        }}
                                        width={480}
                                        playing={true}
                                        className="react-player"
                                      />
                                    </div>
                                  </div>
                                }
                              </div>
                            ))}

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <button
                                class="btn waves-effect blue darken-1"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (
                                    youtubeUrls.filter(
                                      (url) => url.value.length === 0
                                    ).length !== 0
                                  ) {
                                    return;
                                  }
                                  setYoutubeUrls([
                                    ...youtubeUrls,
                                    { value: "", id: makeId() },
                                  ]);
                                }}
                                style={{
                                  color: "white",
                                }}
                              >
                                Ajouter
                              </button>
                              <button
                                class="btn waves-effect blue darken-1"
                                onClick={(e) => {
                                  e.preventDefault();
                                  saveUserVideos();
                                }}
                                style={{
                                  marginLeft: "10px",
                                  color: "white",
                                }}
                              >
                                Enregistrer
                              </button>
                            </div>
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ minWidth: "4rem" }} />
                <div className="w-xl w-auto-sm no-shrink">
                  <div className="sticky">
                    <div className="list mb-5">
                      <div className="list-item list-overlay r">
                        <div className="media">
                          <a
                            className="ajax media-content"
                            style={{
                              backgroundImage: "url(../assets/img/b17.jpg)",
                            }}
                          ></a>
                          <div className="media-action" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ############ Main END*/}
      </div>
      {/* ############ Content END*/}
    </div>
  );
};

export default Profile;
