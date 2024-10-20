export async function imgUpload(file) {

  const formData = new FormData();

  formData.append("image", file);

  try {
    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      return {value: data.imgPath}
    } else {
      return {error: data.error}
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}
