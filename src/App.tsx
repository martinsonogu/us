import './App.css';
import { v4 as uuidv4 } from 'uuid';
type CurrencyType = 'NGN' | 'USD';

interface PayloadType {
  code: '00' | '09' | '03' | '02';
  message: string;
  payload: object;
}

interface ConfigOptionsTypes {
  environment: 'sandbox' | 'live';
  secretKey: string;
  amount: number;
  email: string;
  name: string;
  currency: CurrencyType;
  transactionRef: string;
  mobileNumber?: string;
  onSuccess?: (payload: PayloadType) => void;
  onFailure?: (payload: PayloadType) => void;
  onPending?: (payload: PayloadType) => void;
}

const App = () => {
  const transRef = uuidv4();
      const configOptions: ConfigOptionsTypes = {
        environment: 'live',
        secretKey: import.meta.env.VITE_SECRET_KEY,
        amount: 600,
        email: 'martins@payonus.com',
        name: 'SuperMall',
        currency: 'NGN',
        mobileNumber: '09077777777',
        transactionRef: transRef,
        onSuccess: payload => console.log(payload),
        onFailure: payload => console.log(payload),
        onPending: payload => console.log(payload)
      };
      const handleButtonClick = () => {
        // @ts-ignore
        if (window.PayonusGateway) {
          // @ts-ignore
          const { openPopup, exitPopup } = window.PayonusGateway.create(configOptions);
        openPopup();
        }

      };

  
  return (
    <>
      <h3>Hello, click the button below to make payment</h3>
      <button onClick={handleButtonClick}>Pay</button>
    </>
  );
};

export default App;
