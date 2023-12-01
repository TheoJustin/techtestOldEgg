import React from "react";
import "./PcStart.scss";
import logo from "../../assets/logo_pc_builder.png";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Pc {
  pc_id: number;
  totalpower: number;
  maxpower: number;
  urlimage: string;
  name: string;
  price: number;
}

const PcStart = () => {
  const location = useLocation();
  const { userData } = location.state || {};
  const [pcs, setPc] = React.useState<Pc[]>([]);
  
  const navigate = useNavigate();

  function handleCreateListSubmitForm(index : number) {
    const completeFormData = {
      user_id: userData.id,
      totalpower: pcs[index].totalpower,
      maxpower: pcs[index].maxpower,
      urlimage: pcs[index].urlimage,
      name: pcs[index].name,
      price: pcs[index].price
    };

    console.log(completeFormData);
    
    axios
      .post("http://localhost:8080/pc/insert", completeFormData)
      .then((response) => {
        const pcid = response.data.pcid;
        console.log("Response:", response.data);
        navigate("/pc/home", { state: { data: completeFormData , pcid: pcid, userData: userData} });
      })
      .catch((error) => {
        console.error("Error creating pc item:", error);
      });
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/pc")
      .then((response) => {
        setPc(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <div>
      <Navbar firstName={userData.first_name} />
      <div className="pc-start-container">
        <div className="pc-start-box">
          <img src={logo} alt="" className="pc-start-img" />
          <div className="pc-start-header1">
            Building Your Own Custom PC Starts Here
          </div>
          <div className="pc-start-header-container">
            <div className="pc-start-header2">Need a helping hand?</div>
            <div className="pc-start-header2">
              Jump start your build with one of these configurations
            </div>
          </div>
          <div className="pc-start-img-container">
            {pcs.map((item, index) => (
              <div
                className="pc-start-img-box"
                key={item.pc_id}
                onClick={() => handleCreateListSubmitForm(index)}
              >
                <img
                  src={item.urlimage}
                  alt=""
                  className="pc-start-img-config"
                />
                <div className="pc-start-img-level">{item.name}</div>
                <div className="pc-start-img-price">Sub ${item.price}</div>
                <div className="pc-start-img-btn-container">
                  <div className="pc-start-btn">BUILD IT WITH INTEL</div>
                  <div className="pc-start-btn">BUILD IT WITH AMD</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PcStart;
