function downloadImage(data) {
    const { name, base64 } = data
    console.log(base64, 'base64')
    let a = document.createElement('a')
    a.href = "data:image/png;base64," + base64
    a.download = name + ".png"
    a.click()
}

export {
    downloadImage
}