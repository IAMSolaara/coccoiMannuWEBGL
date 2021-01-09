window.onload = () => {
    const canvas = document.getElementById("mainCanvas")
    const ctx = canvas.getContext("webgl")

    if (ctx === null) {
        alert("WebGL can't run on this browser. Seeya")
        return;
    }

    ctx.clearColor(0.2, 0.3, 0.3, 1.0)

    ctx.clear(ctx.COLOR_BUFFER_BIT)
}