import Link from "next/link";
import ImageCard from "./ImageCard";

const Card = ({
    propertyName,
    slug,
    rentalPrice,
    beds,
    image
}) => {
    return (
        <Link href={`/property/${slug}`}>
            <div className="card">
                <ImageCard/>
                <div className="text-container">
                    <h3>R{rentalPrice} / month</h3>
                    <h3>{beds} Beds</h3>
                    <p>{propertyName}</p>
                </div>
            </div>
        </Link>
    );
}

export default Card;