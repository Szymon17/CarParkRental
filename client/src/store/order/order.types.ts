type orderData = {
  pickUpDate: Date;
  returnDate: Date;
  pickUpLocation: String;
  returnLocation: String;
};

type orderInitialState = orderData & {
  orderIndex: number | null;
};

export { orderData, orderInitialState };
