import React from "react";
import ContainerData from "../../../components/ContainerData/ContainerData";
import "./AddItem.scss";
import CustomInput from "../../../components/Input/Input";
import SelectInput from "../../../components/Input/Selecter/Selecter";

const AddItem = () => {
  return (
    <div>
      <ContainerData pagename={"Add Item"} headerVisible={false}>
        <div className="additem-content">
          <div className="additem-topmenu">
            <h2 style={{ fontWeight: "bold" }}>New Item</h2>
            <div className="btn-section">
              <button className="btn">Save</button>
              <button className="btn white">Discard</button>
            </div>
          </div>

          <div className="additem-form">
            <form action="" className="additems-grid">
              <div className="additems-input">
                <CustomInput
                  required={true}
                  label={"Name*"}
                  value={""}
                  placeholder="Name"
                />
                <CustomInput
                  required={false}
                  label={"SKU"}
                  value={""}
                  placeholder="Enter SKU"
                />
                <SelectInput
                  label={"Unit"}
                  options={[]}
                  value={""}
                  onChange={function (
                    e: React.ChangeEvent<HTMLSelectElement>
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                  placeholder={"Select unit"}
                />
                <SelectInput
                  label={"Brand"}
                  options={[]}
                  value={""}
                  onChange={function (
                    e: React.ChangeEvent<HTMLSelectElement>
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                  placeholder={"Select Brand"}
                />
                <SelectInput
                  label={"Store"}
                  options={[]}
                  value={""}
                  onChange={function (
                    e: React.ChangeEvent<HTMLSelectElement>
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                  placeholder={"Select Store"}
                />
                <CustomInput
                  required={false}
                  label={"Dimention"}
                  value={""}
                  placeholder="Name"
                />{" "}
                <CustomInput
                  required={false}
                  label={"Price"}
                  value={""}
                  placeholder="Enter price"
                />{" "}
                <SelectInput
                  label={"Price Type"}
                  options={[]}
                  value={""}
                  onChange={function (
                    e: React.ChangeEvent<HTMLSelectElement>
                  ): void {
                    throw new Error("Function not implemented.");
                  }}
                  placeholder={"Price Type"}
                />
              </div>
              <div className="image-upload-section">
                <div className="image-input-border">
                  <div className="upload-text">
                    <p>Drag image here</p> <br /> <p>or</p> <br />{" "}
                    <p style={{ color: "#7F5AF0" }}>Browse Image</p>
                  </div>
                  <input type="file" name="" id="" />
                </div>
                <p>File: </p>
              </div>
            </form>
          </div>
        </div>
      </ContainerData>
    </div>
  );
};

export default AddItem;
