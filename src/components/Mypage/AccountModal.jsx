import React, { useState, useRef } from "react";
import Warning from "../../assets/Warning.png";

const AccountModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  return (
    <>
      <button className="Exit" onClick={() => setModalOpen(true)}>
        계정 탈퇴
      </button>
      {modalOpen && (
        <div
          className={"modal-container"}
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              setModalOpen(false);
            }
          }}
        >
          <div className={"modal-content"}>
            <img src={Warning} alt="Warninig" style={{ marginTop: "41px" }} />
            <p className="WarningSign">정말 탈퇴하시겠습니까?</p>
            <p className="WarningContent">탈퇴 시 모든 데이터를 잃게 됩니다</p>
            <div style={{display:"flex", justifyContent: "center", gap: "52px"}}>
              <button
                className={"modal-close-btn"}
                onClick={() => setModalOpen(false)}
                id="Account_Yes"
              >
                네
              </button>
              <button
                className={"modal-close-btn"}
                onClick={() => setModalOpen(false)}
                id="Account_No"
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountModal;
