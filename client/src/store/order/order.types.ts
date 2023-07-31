type orderData = {
  date_of_receipt: Date;
  date_of_return: Date;
  place_of_receipt: String;
  place_of_return: String;
};

type orderInitialState = orderData & {
  productIndex: number | null;
};

export { orderData, orderInitialState };
