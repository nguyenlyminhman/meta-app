import { Button, Col, Form, Input, Row, Modal } from "antd";
import { useState, useContext, useEffect } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
// import axios from "axios";
import { DarkThemeContext } from "components/DarkMode";
import { useHistory } from "react-router-dom";
import { getAuthenticate } from "store/disableMenu/action";
import { connect } from "react-redux";
import urlLoading from "../assets/images/loading.gif"

function NFTCreate(props) {
  const contractProcessor = useWeb3ExecuteFunction();
  const { marketAddress, contractABI } = useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI);
  const createToken = "createToken";
  const { Moralis, account } = useMoralis();
  const { mainColor } = useContext(DarkThemeContext);

  const [form] = Form.useForm();
  const history = useHistory();

  const [formInput, updateFormInput] = useState({ name: "", description: "" });
  const [fileType, setFileType] = useState();
  const [fileName, setFileName] = useState('');
  const [visible, setVisible] = useState(false);
  const [metadata, setMetadata] = useState();
  const [formValid, setFormValid] = useState({
    nameErr: false,
    descriptionErr: false,
    fileErr: false,
  });
  const [isValidType, setIsValidType] = useState(true);
  const [mediaSrc, setMediaSrc] = useState();

  const checkAuthen = async () => {
    const users = Moralis.Object.extend("profile");
    const query = new Moralis.Query(users);
    query.equalTo("address", account);
    const data = await query.first();
    return data;
  }

  useEffect(() => {
    checkAuthen().then((res) => {
      if (res) {
        // setAuthenticate(true);
        //  setUser(res.attributes.name)
      } else {
        props.getAuthenticate({ authenticated: true });
        history.push('/profile')
      }
    });
  })


  function checkValidType(file) {
    let result = false;
    // .JPG, .PNG, .MP4, .MP3, .WAV.
    let fileExtension = file.name.slice(-4).toLowerCase();
    let filesize = file.size;

    if (
      (fileExtension === '.jpg' ||
        fileExtension === '.png' ||
        fileExtension === '.mp4' ||
        fileExtension === '.mp3' ||
        fileExtension === '.wav') && filesize <= 52428800) {
      result = true;
    }
    console.log(result);
    return result;
  }

  const onChangeImage = async (e) => {
    let file = e.target.files[0];

    setIsValidType(true);
    setMetadata(null);
    setFileName('');
    setMediaSrc('')
    setFileType('');

    if (file === undefined) {
      setFormValid({
        ...formValid,
        fileErr: false
      });
      return
    }
    if (!checkValidType(file)) {
      setIsValidType(false);
      setFormValid({
        ...formValid,
        fileErr: false
      });
      return;
    }

    setFileName(file.name);
    setFileType(file.type);
    const image = await uploadImageData(e);
    const _metadata = await uploadMetaData(image);
    setMetadata(_metadata);
    setVisible(false);
  }

  const uploadImageData = async (e) => {
    const data = e.target.files[0];
    const file = new Moralis.File(data.name, data);
    await file.saveIPFS();
    let fileUrl = file.ipfs()
    setMediaSrc(fileUrl);
    return fileUrl;
  }

  const uploadMetaData = async (imgUrl) => {
    const metadata = {
      name: formInput.name,
      description: formInput.description,
      image: imgUrl
    }

    const file = new Moralis.File("file.json", { base64: btoa(JSON.stringify(metadata)) });
    await file.saveIPFS();
    return file.ipfs()
  }

  function isFormValid() {

    if (formInput.name === "" && formInput.description === "" && fileName === "") {
      setFormValid({ ...formValid, nameErr: true, descriptionErr: true, fileErr: true });
      return false;
    }

    if (formInput.name === "" && formInput.description === "") {
      setFormValid({ ...formValid, nameErr: true, descriptionErr: true });
      return false;
    }

    if (formInput.name === "" && fileName === "") {
      setFormValid({ ...formValid, nameErr: true, fileErr: true });
      return false;
    }

    if (formInput.description === "" && fileName === "") {
      setFormValid({ ...formValid, descriptionErr: true, fileErr: true });
      return false;
    }

    if (formInput.name === "") {
      setFormValid({ ...formValid, nameErr: true });
      return false;
    }

    if (formInput.description === "") {
      setFormValid({ ...formValid, descriptionErr: true });
      return false;
    }

    if (fileName === "") {
      setFormValid({ ...formValid, fileErr: true });
      return false;
    }

    if (formInput.name !== "" && formInput.description !== "" && fileName !== "") {
      setFormValid({ ...formValid, nameErr: false, descriptionErr: false, fileErr: false });
      return true;
    }
  }

  async function createNFT() {
    if (isFormValid()) {
      setVisible(true);
      const ops = {
        contractAddress: marketAddress,
        functionName: createToken,
        abi: contractABIJson,
        params: {
          tokenURI: metadata,
        },
      };
      await contractProcessor.fetch({
        params: ops,
        onSuccess: () => {
          setTimeout(() => {
            setVisible(false);
            successCreate();
          }, 33000)
        },
        onError: (error) => {
          updateFormInput({ ...formInput, name: "", description: "" });
          setFileType("");
          setMediaSrc("")
          setVisible(false);
          failCreate();
        },
      });
    }
  }

  function successCreate() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "Success!",
      content: `NFT is created, you may check your NFT`,
    });
    history.push('/my-collection')
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function failCreate() {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: "Error!",
      content: `There was a problem with creating NFT`,
    });
    setFileName('');
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  return (
    <div style={{ padding: "100px", maxWidth: "1030px", width: "100%" }}>
      <Form form={form} layout="vertical">
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item >
              <label style={{ color: mainColor.txt }}>Asset Name</label>
              <Input
                value={formInput.name}
                placeholder="Asset name"
                onChange={(e) =>
                  updateFormInput({ ...formInput, name: e.target.value })
                }
              />
              <div style={{ color: "red" }}>
                {!formInput.name && formValid.nameErr
                  ? "Please input your asset name"
                  : ""}
              </div>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <label style={{ color: mainColor.txt }}>Description</label>
              <Input.TextArea
                placeholder="Asset Description"
                rows={5}
                value={formInput.description}
                onChange={(e) =>
                  updateFormInput({ ...formInput, description: e.target.value })
                }
              />
              <div style={{ color: "red" }}>
                {!formInput.description && formValid.descriptionErr
                  ? "Please input your description"
                  : ""}
              </div>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item >
              <label style={{ color: mainColor.txt }}>Image</label>
              <Input type="file" onChange={onChangeImage} accept='.jpg,.mp4,.mp3,.png,.wav' />
              {

                (!metadata && fileType && isValidType) ?
                  <img  alt="" src={urlLoading} style={{ margin: '10px 0 10px 0' }} width="45" />
                  :
                  (
                    (metadata && mediaSrc && fileType?.includes('video')) ?
                      <video width="350" controls style={{ margin: '10px 0 10px 0' }} > <source src={mediaSrc} type={fileType}></source></video>
                      :
                      (metadata && mediaSrc && fileType?.includes('audio')) ?
                        <audio width="350" controls style={{ margin: '10px 0 10px 0' }} > <source src={mediaSrc} type={fileType}></source></audio>
                        :
                        (metadata && mediaSrc && fileType?.includes('image')) ?
                          <img alt="" src={mediaSrc} style={{ margin: '10px 0 10px 0' }} type={fileType} width="350" />
                          :
                          ""

                  )

  //          <audio className="rounded mt-4" style={{ margin: '10px 0 10px 0' }} width="350" controls>
  //          <source src={url} type={type}></source>
  //          </audio>
              }
              <div style={{ color: "red" }}>
                {!fileName && formValid.fileErr
                  ? "Please upload your NFT file"
                  : ""}
              </div>
              <div style={isValidType ? { color: mainColor.txt } : { color: 'red' }}>File types supported: JPG, PNG, MP4, MP3, WAV.</div>
              <div style={isValidType ? { color: mainColor.txt } : { color: 'red' }}>Max file size : 50MB</div>
            </Form.Item>
          </Col>
          <Col
            span={24}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              onClick={() => createNFT()}
              size="large"
              type="primary"
              htmlType="submit"
              className="btnCreate"
              loading={visible ? true : false}
              disabled={(!metadata && fileType && isValidType) ? true : false}
              style={{ width: "auto", borderRadius: "12px" }}
            >
              {visible ? "Creating" : "Create NFT"}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.Auth,
});
const mapDispatchToProps = {
  getAuthenticate: getAuthenticate
};


export default connect(mapStateToProps, mapDispatchToProps)(NFTCreate);
