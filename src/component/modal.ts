interface ModalOption {
  text: string | string[];
  type?: string;
  icon?: string;
}
interface Modal {
  (option: string | ModalOption, callback?: () => void): void;
}

const modal: Modal = (option, callback?) => {
  const createDiv = (target: string): HTMLDivElement => {
    const el = document.createElement("div");
    el.className = `${target}`;
    return el;
  };
  const $body: HTMLBodyElement | null = document.querySelector(`body`);

  const modal = createDiv("modal");
  const okButton = createDiv("modal-ok-button");
  okButton.innerText = "OK";
  const overlay = createDiv("modal-overlay");

  if (typeof option === "string") {
    modal.innerText = option;
  }

  $body?.appendChild(modal);
  $body?.appendChild(overlay);
  modal.appendChild(okButton);

  overlay.addEventListener("click", () => {
    $body?.removeChild(modal);
    $body?.removeChild(overlay);
  });
  okButton.addEventListener("click", () => {
    $body?.removeChild(modal);
    $body?.removeChild(overlay);
    callback && callback();
  });
  // option 파라미터가 객체일때
  if (typeof option !== "string" && Array.isArray(option.text)) {
    modal.insertAdjacentHTML("afterbegin", option.text.join("<br>"));
  }
  if (typeof option !== "string" && !Array.isArray(option.text)) {
    modal.innerText = option.text;
  }
  if (typeof option !== "string" && option.type === "warning") {
    const cancelButton = createDiv("modal-cancel-button");
    cancelButton.innerText = "Cancel";
    okButton.className = "modal-warning-button";

    modal.appendChild(cancelButton);
    modal.appendChild(okButton);

    cancelButton.addEventListener("click", () => {
      $body?.removeChild(modal);
      $body?.removeChild(overlay);
    });
  }
};

export default modal;
