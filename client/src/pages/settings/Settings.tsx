import CreateGiftCard from "../../components/CreateGiftCard";
import EditGiftCard from "../../components/EditGiftCard";


export default function Settings() {
    const gift = {
        name: 'Snacks',
        starred: true
    }

    return (
        <div>
            <CreateGiftCard/>
            <EditGiftCard gift={gift} deleteGift={() =>{}}/>
        </div>
    );
}
