import { FC, useEffect, useState } from "react"
import { Images } from "../App.tsx"
import { Slot } from "./Slot.tsx"

type Props = {
  images: Images
}

export const Slots: FC<Props> = ({images}) => {
  const [ slotImageOrders, setSlotImageOrders ] = useState<Set<string>[]>([ new Set(), new Set(), new Set() ])
  const [ currentSelection, setCurrentSelection ] = useState<string>("")

  useEffect(() => {
    //   Populate each set of slot options with randomized values from possibleValues. Don't repeat values in the same map.
    setSlotImageOrders((currentSlotImageOrders) => {
      return currentSlotImageOrders.map(() => {
        const newSlotImageOrder = new Set<string>()
        const availableValues = [ ...images.keys() ]

        for (let i = 0; i < images.size; i ++) {
          const randomNumber = Math.floor(Math.random() * availableValues.length)

          newSlotImageOrder.add(availableValues[ randomNumber ])
          availableValues.splice(randomNumber, 1)
        }

        return newSlotImageOrder
      })
    })
  }, [ setSlotImageOrders, images ])

  // to trigger rolling and maintain state
  const roll = () => {
    const randomValue = Math.floor(Math.random() * images.size)

    setCurrentSelection([ ...images.keys() ][ randomValue ])
  }

  return (
    <div className="SlotMachine">
      <main>
        {slotImageOrders.map((imageOrder, i) => (
          <Slot
            key={i}
            images={images}
            imageOrder={imageOrder}
            currentSelection={currentSelection}
          />),
        )}
      </main>
      <button
        type={"button"}
        className={"roll"}
        onClick={roll}
      >
        Roll
      </button>
    </div>
  )

}
