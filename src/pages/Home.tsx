import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const Home: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [saved, setSaved] = useState<number>(0);
  const [displayedSaved, setDisplayedSaved] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const { width, height } = useWindowSize(); // for confetti canvas size

  // Load streak from localStorage
  useEffect(() => {
    const storedStreak = localStorage.getItem("streak");
    if (storedStreak) setStreak(Number(storedStreak));
  }, []);

  useEffect(() => {
    localStorage.setItem("streak", streak.toString());
  }, [streak]);

  const calculate = () => {
    if (amount <= 0) return;

    const roundUp = Math.ceil(amount / 100) * 100;
    const savedAmount = roundUp - amount;
    setSaved(savedAmount);

    // Animate saved amount
    let start = 0;
    const duration = 500;
    const stepTime = 50;
    const increment = savedAmount / (duration / stepTime);

    const interval = setInterval(() => {
      start += increment;
      if (start >= savedAmount) {
        start = savedAmount;
        clearInterval(interval);
      }
      setDisplayedSaved(Math.floor(start));
    }, stepTime);

    // Update streak
    setStreak((prev) => {
      const newStreak = prev + 1;

      // Show confetti on milestones
      if (newStreak % 7 === 0) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000); // 3 seconds
      }

      return newStreak;
    });

    // Update progress
    const monthlyProjection = savedAmount * 30;
    const goal = 50000;
    setProgress(Math.min(monthlyProjection / goal, 1));
  };

  const monthlyProjection = saved * 30;

  const messages = [
    "Tiny money becomes big money.",
    "Consistency beats income.",
    "You’re building a habit.",
    "Future you is smiling.",
  ];
  const randomMessage =
    messages[Math.floor(Math.random() * messages.length)];

  return (
    <IonPage>
      <IonContent className="ion-padding">

        {/* Confetti */}
        {showConfetti && <Confetti width={width} height={height} />}

        <h1>MicroSaver</h1>

        <IonInput
          type="number"
          placeholder="Enter today’s spending"
          value={amount === 0 ? '' : amount}
          onIonChange={(e) => setAmount(Number(e.detail.value))}
        />

        <IonButton expand="block" onClick={calculate}>
          Calculate Round-Up
        </IonButton>

        <IonText>
          <motion.h2
            key={displayedSaved}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Saved today: ₦{displayedSaved}
          </motion.h2>

          <h3>Monthly projection: ₦{monthlyProjection}</h3>
          <h3>🔥 Saving streak: {streak} day{streak !== 1 ? 's' : ''}</h3>
        </IonText>

        {/* Animated progress bar */}
        <motion.div
          style={{
            height: "20px",
            background: "#eee",
            borderRadius: "10px",
            overflow: "hidden",
            marginTop: "15px",
          }}
        >
          <motion.div
            style={{ height: "100%", background: "#4caf50" }}
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        <p style={{ marginTop: "20px", fontStyle: "italic" }}>
          {randomMessage}
        </p>

      </IonContent>
    </IonPage>
  );
};

export default Home;
