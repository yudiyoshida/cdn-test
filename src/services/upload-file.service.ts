export function uploadFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('https://example.com/upload-file/single', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to upload file');
        }
        return response.json();
      })
      .then((data: { url: string }) => {
        resolve(data.url);
      })
      .catch((error) => {
        reject(error);
      });
  });
}