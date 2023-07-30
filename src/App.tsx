import classNames from "classnames"
import { ChangeEvent, useState } from "react"
import "./App.css"
import { Slots } from "./components/Slots.tsx"

export type Images = Map<string, string>

function App() {
  const [ isOpen] = useState(true)
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
    <div className={"relative h-full"}>
      <div className={"container mx-auto"}>
        <Slots images={images} />
      </div>
      <div
        className={classNames("w-72 bg-white border-r border-slate-200 drop-shadow-xl top-0 h-full px-6 py-4 transition-all duration-300 absolute", isOpen ? "right-0" : "-right-96")}>
        <input type={"file"} accept={"image/*"} onChange={onImageChange} multiple={true} />
      </div>
    </div>
  )
}

export default App
