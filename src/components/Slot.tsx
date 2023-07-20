import { forwardRef } from "react"

export type Images = Map<string, string>

type Props = {
  options: Images
  currentSelection: string
}

type Ref = HTMLDivElement

export const Slot = forwardRef<Ref, Props>(({ options }, ref) => {
  return (
    <div className="slot">
      <section>
        <div className="container" ref={ref}>
          {options.map(option => (
            <div key={option}>
              <span>{option}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
})
