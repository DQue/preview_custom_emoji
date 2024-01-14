DEBUG_n1 = 0; DEBUG = false;

function $(a) { return document.getElementById(a) }
function ce(a) { return document.createElement(a) }
function ct(a) { return document.createTextNode(a) }
function cl(e) { while (e.firstChild) { e.removeChild(e.firstChild) } }

window.addEventListener("DOMContentLoaded", () => {
    let es;

    $("u_file").addEventListener("change", ファイルから絵文字追加, false);
    $("u_url_submit").addEventListener("click", URLから絵文字追加, false);

    es = document.getElementsByClassName("reaction_size");
    for (let i = 0; i < es.length; i++) {
        es[i].addEventListener("change", 設定変更);
    }

    $("reaction_limit_width").addEventListener("change", 設定変更);


    設定変更();
}, false)

function 設定変更() {
    const reaction_size = $("settings").reaction_size.value;
    document.body.dataset.reaction_size = reaction_size;

    const lim = $("reaction_limit_width").checked;
    document.body.dataset.limit_width = lim;
}

function ファイルから絵文字追加(e) {
    DEBUG = e.target;
    if (e.target == null) return;

    const reader = new FileReader();
    reader.addEventListener("load", (e) => { const s = e.target.result; console.log(s); 絵文字追加(s); }, false);
    reader.readAsDataURL(e.target.files[0]);

}
function URLから絵文字追加(e) {
    e.preventDefault();
    const s = $("u_file_url").value;
    if (s !== null && s.length > 0) {
        絵文字追加(s);
        $("u_file_url").value = "";
    }
}
function 絵文字追加(src) {

    //本文に追加
    e_imge = ce("img");
    e_imge.src = src;
    e_imge.classList.add("main_article_emoji");
    let es = document.getElementsByClassName("main_article_text");
    for (let i = 0; i < es.length; i++) {
        es[i].appendChild(e_imge.cloneNode(true));
    }

    //リアクション追加
    const e_r = ce("div");
    e_r.classList.add("main_article_reaction_container");

    const e_imgr = e_r.appendChild(ce("img"));
    e_imgr.src = src;
    e_imgr.classList.add("main_article_reaction_img");

    const e_n = e_r.appendChild(ce("span"));
    e_n.classList.add("main_article_reaction_num");
    e_n.appendChild(ct((() => { return Math.floor(Math.random() * 20 + 3) })()));

    const e_rr = e_r.cloneNode(true);
    e_rr.classList.add("reacted");

    es = document.getElementsByClassName("main_article_reactions");
    for (let i = 0; i < es.length; i++) {
        es[i].appendChild(e_r.cloneNode(true));
        es[i].appendChild(e_rr.cloneNode(true));
    }

}
function 画像URL取得() {
    const e_file = $("u_file");
    const e_url = $("u_file_url");
    let flags = {
        ok: false,
        url: false,
        file: false
    };

    if (e_url.value !== "") {
        flags.ok = true;
        flags.url = true;
    }
    if (e_file.files && e_file.files[0]) {
        flags.ok = true;
        flags.file = true;
    }


    if (flags.ok === false) return null;
    if (flags.file) {
        return URL.createObjectURL(e_file.files[0])
    }
    if (flags.url) {
        return e_url.value;
    }
}


