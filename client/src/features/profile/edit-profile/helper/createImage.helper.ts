export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject): void => {
    const img: HTMLImageElement = document.createElement("img");
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err: ErrorEvent): void => reject(err));
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
  });

