import {
  Form,
  Input,
  Button,
  Modal,
  Alert,
  Card,
  Avatar,
  Row,
  Col
} from "antd";
import Text from "antd/lib/typography/Text";
// import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
// import { DarkThemeContext } from "components/DarkMode";
import { useHistory } from "react-router-dom";
import { getAuthenticate } from "store/disableMenu/action";
import { connect } from "react-redux";
import styles from "./styles.module.css";
// import NativeBalance from "../NativeBalance";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!"
  },
  number: {
    range: "${label} must be between ${min} and ${max}"
  }
};
/* eslint-enable no-template-curly-in-string */
// const { useBreakpoint } = Grid;

// const styles2 = {
//   card: {
//     alignItems: "center",
//     width: "100%",
//     height: "100%",
//   },
//   header: {
//     textAlign: "center",
//   },
//   input: {
//     width: "100%",
//     outline: "none",
//     fontSize: "16px",
//     whiteSpace: "nowrap",
//     overflow: "hidden",
//     textverflow: "ellipsis",
//     appearance: "textfield",
//     color: "#041836",
//     fontWeight: "700",
//     border: "none",
//     backgroundColor: "transparent",
//   },
//   select: {
//     marginTop: "20px",
//     display: "flex",
//     alignItems: "center",
//     width: "100%",
//   },
//   textWrapper: { maxWidth: "80px", width: "100%" },
//   row: {
//     display: "flex",
//     alignItems: "center",
//     gap: "10px",
//     flexDirection: "row",
//   },
// };

// const styles = {
//   title: {
//     fontSize: "30px",
//     fontWeight: "600",
//   },
//   header: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: "5px",
//   },
//   card: {
//     boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
//     border: "1px solid #e7eaf3",
//     borderRadius: "1rem",
//     width: "450px",
//     fontSize: "16px",
//     fontWeight: "500",
//   },
//   label: {
//     border: "1px solid #ccc",
//     display: "inline-block",
//     padding: "6px 12px",
//     cursor: "pointer",
//     width:'auto'
//   },
// };

function Profile(props) {
  // const { mainColor } = useContext(DarkThemeContext);
  const history = useHistory();
  // const { md } = useBreakpoint();
  const { Moralis, account } = useMoralis();
  const [auth, setAuth] = useState();
  const queryProfile = useMoralisQuery("profile");
  const fetchProfile = JSON.parse(
    JSON.stringify(queryProfile.data, [
      "address",
      "email",
      "name",
      "phone",
      "background",
      "avatar",
      "bio"
    ])
  );
  const [form] = Form.useForm();
  const [image, setImage] = useState("");
  const [bg, setBg] = useState("");
  const [loading, setLoading] = useState(false);
  const [changeAva, setChangeAva] = useState(false);
  // const [changeAva, setChangeAva] = useState(false);

  const checkAuthen = () => {
    const result =
      fetchProfile.find((element) => element.address === account) || null;
    if (result) {
      setAuth(true);
      form.setFieldsValue({
        name: result.name,
        email: result.email,
        phone: result.phone,
        bio: result.bio
      });
      // if(changeAva){
      //   setBg('');
      //   setImage('');
      // } else {
      //   setBg(result.background);
      //   setImage(result.avatar);
      // }
      setBg(result.background);
      setImage(result.avatar);
    } else {
      setAuth(false);
    }
  };
  useEffect(() => {
    if (!changeAva) {
      checkAuthen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const onFinish = async (values) => {
    // authenticate().then(async () => {
    // console.log('isAuthenticated', isAuthenticated, account)
    // if(isAuthenticated) {
    const users = Moralis.Object.extend("profile");
    const query = new Moralis.Query(users);
    let save;
    if (auth) {
      query.equalTo("address", account);
      save = await query.first();
    } else {
      save = new users();
    }

    save.set("address", account);
    save.set("name", values.name);
    save.set("email", values.email);
    save.set("phone", values.phone);
    save.set("avatar", image);
    save.set("background", bg);
    save.set("bio", values.bio);

    save.save().then(() => {
      let secondsToGo = 2;
      const modal = Modal.success({
        title: "Success!",
        content: `Save success`
      });
      props.getAuthenticate({ authenticated: false });
      history.push("/my-collection");
      setTimeout(() => {
        modal.destroy();
      }, secondsToGo * 1000);
    });
    // } else {
    //   let secondsToGo = 2;
    //   const modal = Modal.error({
    //     title: "Error!",
    //     content: `Authenticate failed`,
    //   });
    //   setTimeout(() => {
    //     modal.destroy();
    //   }, secondsToGo * 1000);
    // }
    // })
    // authenticate({
    //   onSuccess: async () => {
    //     if (isAuthenticated) {
    //       const users = Moralis.Object.extend("profile");
    //       const query = new Moralis.Query(users);
    //       let save;
    //       if (auth) {
    //         query.equalTo("address", account);
    //         save = await query.first();
    //       } else {
    //         save = new users();
    //       }
  };
  const onChange = async (e) => {
    // setFileList(newFileList);
    console.log(e);
    setLoading(true);
    setChangeAva(true);
    const image = await uploadImageData(e);
    setImage(image);
    setLoading(false);
  };

  const onChangeBackground = async (e) => {
    setChangeAva(true);
    setLoading(true);
    const bg = await uploadImageData(e);
    setBg(bg);
    setLoading(false);
  };

  const uploadImageData = async (e) => {
    const data = e.target.files[0];
    // console.log(data);
    const file = new Moralis.File(data.name, data);
    await file.saveIPFS();
    // console.log(file.ipfs(), file.hash());
    return file.ipfs();
  };

  console.log(image);
  return (
    <>
      <div>
        {!auth ? (
          <Alert
            message="Please type your information for going the next page"
            type="info"
          />
        ) : (
          <></>
        )}
      </div>
      {/* <div style={{ padding: "100px", maxWidth: "1030px", width: "100%" }}>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          form={form}
        >
          <Form.Item
            name={"name"}
            label={<label style={{ color: mainColor.txt }}>Name</label>}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"email"}
            label={<label style={{ color: mainColor.txt }}>Email</label>}
            rules={[{ type: "email" }, { required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"phone"}
            label={<label style={{ color: mainColor.txt }}>Phone</label>}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              htmlType="submit"
              className={`${!md && "mobile"} ${styless.label}`}
              style={{ borderColor: "#27AAE1", color: "#27AAE1" }}
            >
              SUBMIT
            </Button>
          </Form.Item>
        </Form>
      </div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundImage: `url(${bg})`
        }}
      >
        <Card
          className={styles.card}
          title={
            <div className={styles.header}>
              {/* <Blockie scale={5} avatar currentWallet />
          <Address size="6" copyable /> */}
              {/* <NativeBalance /> */}
              <Avatar
                size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 80, xxl: 100 }}
                // icon={<AntDesignOutlined />}
                src={image}
              />
              {/* <ImgCrop rotate>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 5 && '+ Upload'}
                </Upload>
              </ImgCrop> */}
              <div className={styles.rowLabel}>
                <Row>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "between",
                      padding: "20px"
                    }}
                  >
                    <Col span={12}>
                      <label
                        className={styles.label}
                        style={{ textAlign: `center` }}
                      >
                        &ensp;&emsp;Upload Avatar&emsp;&ensp;
                        <Input
                          type="file"
                          onChange={onChange}
                          bordered={false}
                          className={styles.btnAvatar}
                          style={{ display: "none" }}
                          disabled={loading}
                        />
                      </label>
                    </Col>
                    &ensp;
                    <Col span={12} offset={0}>
                      <label className={styles.label}>
                        Upload Background
                        <Input
                          type="file"
                          onChange={onChangeBackground}
                          bordered={false}
                          style={{ display: "none" }}
                          disabled={loading}
                        />
                      </label>
                    </Col>
                    {/* <input type="file" style={{display:'none'}} />  */}
                    {/* <Input type="file" onChange={onChangeBackground}  bordered={false}/> */}
                  </div>{" "}
                </Row>{" "}
              </div>
            </div>
          }
        >
          {/* <Transfer /> */}
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            form={form}
          >
            <div className={styles.card1}>
              <div className={styles.tranfer}>
                <div className={styles.header}>
                  <h3>Your Information</h3>
                </div>
                <div className={styles.select}>
                  <div className={styles.textWrapper}>
                    <Text strong>Name *</Text>
                  </div>
                  <Form.Item
                    name={"name"}
                    rules={[{ required: true }]}
                    style={{ width: "100%", marginTop: "20px" }}
                  >
                    <Input style={{ width: "100%" }} />
                  </Form.Item>
                </div>
                <div className={styles.select}>
                  <div className={styles.textWrapper}>
                    <Text strong>Email *</Text>
                  </div>
                  <Form.Item
                    name={"email"}
                    rules={[{ type: "email" }, { required: true }]}
                    style={{ width: "200%" }}
                  >
                    <Input style={{ width: "100%" }} />
                  </Form.Item>
                </div>
                <div className={styles.select}>
                  <div className={styles.textWrapper}>
                    <Text strong>Phone</Text>
                  </div>
                  <Form.Item
                    name={"phone"}
                    style={{ width: "100%", marginTop: "20px" }}
                  >
                    <Input style={{ width: "100%" }} />
                  </Form.Item>
                </div>
                <div className={styles.select}>
                  <div className={styles.textWrapper}>
                    <Text strong>Bio</Text>
                  </div>
                  <Form.Item name={"bio"} style={{ width: "100%" }}>
                    <Input.TextArea style={{ width: "100%" }} />
                  </Form.Item>
                </div>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className={`${styles.button} ${styles.btnUpdate}`}
                  loading={loading}
                  style={{
                    width: "100%",
                    marginTop: "25px",
                    fontFamily: "GILROY"
                  }}
                  // onClick={() => transfer()}
                  disabled={loading}
                >
                  Update
                </Button>
              </div>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  auth: state.Auth
});
const mapDispatchToProps = {
  getAuthenticate: getAuthenticate
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
