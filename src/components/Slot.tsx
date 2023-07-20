import { FC, MutableRefObject, useRef } from "react"
import { Images } from "../App.tsx"

type Props = {
  images: Images
  imageOrder: Set<string>
  currentSelection: string
}

export const Slot: FC<Props> = ({ images, imageOrder, currentSelection }) => {
  const ref = useRef(null)

  const triggerSlotRotation = (ref: MutableRefObject<HTMLDivElement>) => {
    if (ref === null) return

    function setTop(top: number) {
      if (ref === null) return

      ref.style.top = `${top}px`
    }

    const options = ref.children

    // Get index of chosen option from order
    const index = [ ...imageOrder ].indexOf(currentSelection)
    const chosenOption = options[ index ]
    setTop(- chosenOption.offsetTop + 2)
  }

  return (
    <div className="slot">
      <section>
        <div className="container" ref={ref}>
          {[ ...imageOrder ].map(imageName => (
            <img key={imageName} src={images.get(imageName)} />
          ))}
        </div>
      </section>
    </div>
  )
}
