class Toast {
  constructor(msg, dur = 2000) {
    this.addStyle();
    this.msg = msg;
    this.dur = dur;
    this.init();
  }

  init() {
    this.toast(this.msg, this.dur)
  }

  create(msg, dur) {
    const HTML = `
      <div class="toast">
        <div class="toast-text">${msg}</div>
      </div>
    `;
    const toastEl = document.querySelector('.toast');

    if (toastEl) return;
    document.body.insertAdjacentHTML('beforeend', HTML);

    this.show();

    setTimeout(() => {
      this.hide();
    }, dur);
  }

  show() {
    const toastEl = document.querySelector('.toast');

    toastEl.style.display = 'block';
    toastEl.style.marginTop = `-${Math.round(toastEl.offsetHeight / 2)}px`;

    if (toastEl) return;
  }

  hide() {
    const toastEl = document.querySelector('.toast');
    const toastStyle = document.querySelector('#toast-style');

    if (!toastEl) return;

    toastEl.parentNode.removeChild(toastEl);
    toastStyle.remove();
  }

  toast(msg, dur) {
    return this.create(msg, dur);
  }

  addStyle() {
    const styleText = '.toast {' +
        'position: fixed;' +
        'background: rgba(0,0,0,.7);' +
        'border-radius: 4px;' +
        'top: 50%;' +
        'left: 50%;' +
        'transform: translate(-50%,-50%);' +
        'max-width: 60%;' +
        'text-align: center;' +
        'transition: all .1s;' +
        'z-index: 10001' +
        '}' +
        '.toast-text {' +
        'color: #fff;' +
        'padding: 10px;' +
        'font-size: 16px' +
        '}';
    const a = document.createElement("style");
    const c = document;
    a.id = 'toast-style';
    c.getElementsByTagName("head")[0].appendChild(a);
    if (a.styleSheet) {
      a.styleSheet.cssText = styleText
    } else {
      a.appendChild(c.createTextNode(styleText))
    }
  }
}

export default Toast;
