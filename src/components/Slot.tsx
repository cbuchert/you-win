import { FC, useCallback } from "react"
import { Images } from "../App.tsx"
import styles from "./Slot.module.css"

type Props = {
  images: Images
  imageOrder: Set<string>
  currentSelection: string
  id: string
}

export const Slot: FC<Props> = ({ images, imageOrder, currentSelection, id }) => {
  const ref = useCallback((node: HTMLImageElement) => {
      if (node) {
        if (node.id === `${id}-${currentSelection}`) {
          // Scroll the node to the middle of the container.
          node.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          })
        }
      }
    }, [ images, currentSelection, id ],
  )

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        {[ ...imageOrder ].slice(- 3)
        .map(imageName => (
          <img key={`${id}-front-${imageName}`} className={styles.image} src={images.get(imageName)} />
        ))}
        {[ ...imageOrder ].map(imageName => (
          <img key={`${id}-${imageName}`} className={styles.image} src={images.get(imageName)} ref={ref}
               id={`${id}-${imageName}`} />
        ))}
        {[ ...imageOrder ].slice(0, 3)
        .map(imageName => (
          <img key={`${id}-back-${imageName}`} className={styles.image} src={images.get(imageName)} />
        ))}
      </section>
    </div>
  )
}
