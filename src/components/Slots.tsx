import { FC, useEffect, useState } from "react"
import { Images } from "../App.tsx"
import { Slot } from "./Slot.tsx"
import styles from "./Slots.module.css"

type Props = {
  images: Images
}

export const Slots: FC<Props> = ({ images }) => {
  const [ slot1ImageOrder, setSlot1ImageOrder ] = useState<Set<string>>(new Set())
  const [ slot1CurrentSelection, setSlot1CurrentSelection ] = useState<string>("")

  useEffect(() => {
    //   Populate each set of slot options with randomized values from possibleValues. Don't repeat values in the same map.
    setSlot1ImageOrder(buildSlotImageOrders())
  }, [ images ])

  function buildSlotImageOrders() {
    const newSlotImageOrder = new Set<string>()
    const availableValues = [ ...images.keys() ]

    for (let i = 0; i < images.size; i ++) {
      const randomNumber = Math.floor(Math.random() * availableValues.length)

      newSlotImageOrder.add(availableValues[ randomNumber ])
      availableValues.splice(randomNumber, 1)
    }

    return newSlotImageOrder
  }

  // to trigger rolling and maintain state
  const roll = () => {
    const randomValue = Math.floor(Math.random() * images.size)
    const randomImage = [ ...images.keys() ][ randomValue ]

    setSlot1CurrentSelection(randomImage)
  }

  return (
    <div className={styles.slotMachine}>
      <main className={"grid grid-cols-3 gap-4 justify-center"} onClick={roll}>
        <div />
        <Slot
          images={images}
          imageOrder={slot1ImageOrder}
          currentSelection={slot1CurrentSelection}
          id={"slot1"}
        />
      </main>
    </div>
  )

}
