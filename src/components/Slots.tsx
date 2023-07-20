import { FC, MutableRefObject, useEffect, useRef, useState } from "react"
import { Images, Slot } from "./Slot.tsx"

type Props = {}

export const Slots: FC<Props> = () => {
  const [ slotOptions, setSlotOptions ] = useState<Images[]>([ new Map(), new Map(), new Map() ])
  const fruits = [ "🍒", "🍉", "🍊", "🍓", "🍇", "🥝" ]

  useEffect(() => {
    // TODO: Populate possibleValues from user-added images
    const possibleValues = []

    //   Populate each set of slot options with randomized values from possibleValues
    setSlotOptions((currentSlotOptions) => {

    })
  }, [ setSlotOptions ])
  // to trigger rolling and maintain state
  const roll = () => {
    // looping through all 3 slots to start rolling
    slotRefs.forEach((ref, i) => {
      if (ref === null || !ref.current) return

      // this will trigger rolling effect
      triggerSlotRotation(ref.current)
    })
  }

  // this will create a rolling effect and return random selected option
  const triggerSlotRotation = (ref: MutableRefObject<HTMLDivElement>) => {
    if (ref === null) return

    function setTop(top: number) {
      if (ref === null) return

      ref.style.top = `${top}px`
    }

    const options = ref.children
    const randomOption = Math.floor(Math.random() * fruits.length)

    const chosenOption = options[ randomOption ]
    setTop(- chosenOption.offsetTop + 2)

    return fruits[ randomOption ]
  }

  const slotRefs = [ useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null) ]

  return (
    <div className="SlotMachine">
      <main>
        <Slot options={fruits} ref={slotRefs[ 0 ]} />
        <Slot options={fruits} ref={slotRefs[ 1 ]} />
        <Slot options={fruits} ref={slotRefs[ 2 ]} />
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
