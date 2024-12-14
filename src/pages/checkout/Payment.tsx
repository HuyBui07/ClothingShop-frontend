import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// images
import productPic from "../../assets/product-demo.png";

// utils
import { formatPrice } from "../../utils";

import { FaCheck } from "react-icons/fa";

export default function Payment() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([
    {
      id: "1",
      name: "Áo thun nam",
      price: 100000,
      color: "Black",
      size: "M",
      quantity: 1,
    },
    {
      id: "2",
      name: "Áo thun nam",
      price: 100000,
      color: "Black",
      size: "M",
      quantity: 1,
    },
    {
      id: "3",
      name: "Áo thun nam",
      price: 100000,
      color: "Black",
      size: "M",
      quantity: 1,
    },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("cod");

  useEffect(() => {
    const totalPrice = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    setTotalPrice(totalPrice);
  }, [cart]);

  const propProductList = [
    {
      id: "1",
      name: "Áo thun nam",
      price: 100000,
      color: "Black",
      size: "M",
    },
    {
      id: "2",
      name: "Áo thun nam",
      price: 100000,
      color: "Black",
      size: "M",
    },
    {
      id: "3",
      name: "Áo thun nam",
      price: 100000,
      color: "Black",
      size: "M",
    },
  ];

  const handleRemoveProduct = (id: string) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCart(
      cart.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  const getQuantity = (id: string) => {
    const product = cart.find((product) => product.id === id);
    return product?.quantity || 1;
  };

  return (
    <div className="w-full px-36 p-10 mb-10">
      <h3 className="font-bold mb-10">THANH TOÁN</h3>

      <div className="flex flex-row w-full gap-10">
        <div className="flex flex-col w-2/3">
          <div className="flex flex-row items-center justify-between w-full border opacity-30 bg-gray-300 mb-8 px-5">
            <p className="font-bold text-2xl my-8">1. TÙY CHỌN GIAO HÀNG</p>
            <FaCheck color="green" />
          </div>

          <div className="flex flex-col w-full border mb-8">
            <p className="font-bold text-2xl my-8 mx-5">
              2. PHƯƠNG THỨC THANH TOÁN
            </p>

            <div className="h-[2px] w-full bg-gray-100 mb-6"></div>

            <div className="flex flex-col px-5 mb-5 gap-5 justify-between">
              <div
                className={`flex justify-center w-2/5 border rounded-lg p-5 hover:cursor-pointer hover:bg-gray-50 ${
                  selectedPayment == "cod" && "bg-gray-200"
                }`}
                onClick={() => setSelectedPayment("cod")}
              >
                <p className="font-semibold">Thanh toán khi giao hàng</p>
              </div>

              <div
                className={`flex justify-center w-2/5 border rounded-lg p-5 hover:cursor-pointer hover:bg-gray-50 ${
                  selectedPayment == "atm" && "bg-gray-200"
                }`}
                onClick={() => setSelectedPayment("atm")}
              >
                <p className="font-semibold ">Thẻ ATM</p>
              </div>

              <div className="h-[2px] w-full bg-gray-100 my-6"></div>

              <p className="whitespace-pre-line">
                {selectedPayment == "cod"
                  ? "Vui lòng thanh toán bằng tiền mặt cho người vận chuyển khi đơn hàng của bạn đã đến nơi."
                  : 'Chọn tiếp tục để tiến hành thanh toán bằng thẻ ATM. Quý khách sẽ được chuyển hướng đến cổng thanh toán sau khi xác nhận chi tiết đơn hàng\n Quý khách vui lòng hoàn tất thanh toán trong vòng 30 phút sau khi nhấn "ĐẶT HÀNG".'}
              </p>

              <button
                className="w-80 h-12 font-semibold text-xl tracking-widest bg-black text-white rounded-none hover:opacity-70 mt-2 mb-5"
                onClick={() => navigate("/checkout/orderreview")}
              >
                TIẾP TỤC
              </button>
            </div>
          </div>

          <div className="flex flex-col w-full border opacity-30 bg-gray-300">
            <p className="font-bold text-2xl my-8 mx-5">3. XÁC NHẬN ĐƠN HÀNG</p>
          </div>
        </div>

        <div className="flex flex-col w-1/3 h-fit sticky top-48">
          <div className="flex flex-col w-full border py-10 px-5">
            <p className="font-bold text-lg mb-10">
              TỔNG ĐƠN HÀNG| {propProductList.length} SẢN PHẨM
            </p>
            {cart.map((item) => (
              <div className="flex flex-row justify-between">
                <p>- {item.name}</p>
                <p>{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
            <div className="flex flex-row justify-between mt-2">
              <p className="font-bold text-xl">Tổng cộng</p>
              <p className="font-bold text-xl">{formatPrice(totalPrice)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}