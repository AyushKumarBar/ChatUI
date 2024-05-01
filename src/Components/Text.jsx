import React from "react";

export default function Text(props) {
  return (
    <div className="my-3 " style={{ maxWidth: "70%", width: "max-content" }}>
      <div
        className={`${
          props.user === "user"
            ? "d-flex flex-row-reverse  justify-content-end "
            : ""
        }  shadow `}
        style={{
          backgroundColor: props.user === "user" ? "#E29578" : "#FFDDD2",
          borderRadius:props.user === "user" ?  "30px 15px 5px 30px" :"15px 30px 30px 5px" ,
        }}
      >
        <div className="px-3 py-2">
          {props.text ? props.text : "Senders Text"}
          <div className="d-flex justify-content-end ">
            <p style={{ fontSize: "0.7rem" }} className=" m-0 pt-1">
              {props.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
