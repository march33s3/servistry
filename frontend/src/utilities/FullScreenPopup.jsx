import React from "react";
import "./FullScreenPopup.css";


const FullScreenPopup = ({
                             title,
                             children,
                             hidden_header,
                             with_table,
                             toggle_request_rework,
                         }) => {
    function close_popup() {
        with_table ? toggle_request_rework("close") : toggle_popup();
    }

    return (
        <div className="fsp" style={{display: `${with_table ? "flex" : "none"}`}}>
            <div onClick={close_popup} className="fsp_overlay"/>
            <div
                className="fsp_content_wrapper"
                style={{opacity: `${with_table ? "1" : "0.3"}`}}
            >
                {!hidden_header && (
                    <header className="fsp_header">
                        <h4>{title}</h4>
                    </header>
                )}
                <div className="fsp_content">{children}</div>
            </div>
        </div>
    );
};

export default FullScreenPopup;

export function toggle_popup(action) {
    const fsp = document.querySelector(".fsp");
    const fsp_content_wrapper = document.querySelector(".fsp_content_wrapper");
    if (action === "show") {
        fsp.style.display = "flex";
        setTimeout(() => {
            fsp_content_wrapper.style.opacity = "1";
        }, 50);
    } else {
        fsp_content_wrapper.style.opacity = "0.3";
        setTimeout(() => {
            fsp.style.display = "none";
        }, 100);
    }
}
