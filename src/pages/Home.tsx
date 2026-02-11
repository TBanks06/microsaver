import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText
} from "@ionic/react";
import { useState } from "react";

const Home: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [saved, setSaved] = useState(0);

  const calculate = () => {
    const roundUp = Math.ceil(amount / 100) * 100;
    setSaved(roundUp - amount);
  };

  const monthlyProjection = saved * 30;

  return (
    <IonPage>
      <IonContent className="ion-padding">

        <h1>MicroSaver</h1>

        <IonInput
          type="number"
          placeholder="Enter today’s spending"
          onIonChange={(e) => setAmount(Number(e.detail.value))}
        />

        <IonButton expand="block" onClick={calculate}>
          Calculate Round-Up
        </IonButton>

        <IonText>
          <h2>Saved today: ₦{saved}</h2>
          <h3>Monthly projection: ₦{monthlyProjection}</h3>
        </IonText>

      </IonContent>
    </IonPage>
  );
};

export default Home;
