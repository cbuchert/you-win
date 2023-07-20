import { ChangeEvent, useState } from "react"
import "./App.css"
import { Slots } from "./components/Slots.tsx"

export type Images = Map<string, string>

function App() {
  const [ images, setImages ] = useState<Images>(new Map())
  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      const newImages = new Map<string, string>()

      Array.from(event.target.files)
      .forEach((file) => {
        const objectURL = URL.createObjectURL(file)

        newImages.set(file.name, objectURL)
      })

      setImages(newImages)
    }
  }
  return (
    <>
      <Slots images={images} />
      <div>
        <input type={"file"} accept={"image/*"} onChange={onImageChange} multiple={true} />
      </div>
    </>
  )
}

export default App
