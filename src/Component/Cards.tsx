import baggy1 from "../assets/Baggy1.jfif"


export const Cards = () => {



    return (
        <div className="py-10 px-10 items-center">
            <div>
                <h3 className="text-center font-bold text-lg">Unisex Baggy Jeans</h3>
                <div className="w-60 bg-amber-600 h-100 p-2 rounded-2xl items-center shadow-2xl">
                    <img src={baggy1} alt="" className="object-cover overflow-hidden rounded" />
                    <p></p>
                </div>
            </div>
        </div>




    )
}