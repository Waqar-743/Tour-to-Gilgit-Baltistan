import { useEffect, useRef, useState } from "react";
import { journeys } from "../../data/journal";
import Icon from "./Icon";
import JournalDialog from "./JournalDialog";

export default function TripPlanner({ onClose }) {
  const [region, setRegion] = useState("hunza");
  const [duration, setDuration] = useState("5");
  const [pace, setPace] = useState("balanced");
  const [plan, setPlan] = useState(null);
  const [downloaded, setDownloaded] = useState(false);
  const firstSelect = useRef(null);
  const resultSummary = useRef(null);
  const styleLabel = (style) =>
    style === "culture"
      ? "Culture & everyday life"
      : style === "unhurried"
        ? "An unhurried pace"
        : "A little of everything";
  const dayNote = (style, index) =>
    style === "culture" && index % 2 === 1
      ? "Leave extra time for a local meal or a conversation with a maker."
      : style === "unhurried"
        ? "Choose one main outing and keep the rest of the day free."
        : "";
  useEffect(() => {
    if (plan) resultSummary.current?.focus();
    else firstSelect.current?.focus();
  }, [plan]);
  const createPlan = (event) => {
    event.preventDefault();
    const journey = journeys[region];
    const count = Number(duration);
    const days = journey.days.slice(0, count);
    if (count < 7)
      days[count - 1] = [
        "A flexible final day",
        "Keep a generous margin for return travel, rest and changing conditions. Confirm onward connections locally.",
      ];
    setPlan({ title: journey.title, days, pace });
    setDownloaded(false);
  };
  const savePlan = () => {
    const content = `${plan.title}\n${plan.days.length} days · ${styleLabel(plan.pace)}\n\n${plan.days.map(([title, text], index) => `Day ${index + 1}: ${title}\n${text}${dayNote(plan.pace, index) ? `\n${dayNote(plan.pace, index)}` : ""}`).join("\n\n")}\n\nThis is a flexible starting point, not a booking or an access guarantee. Confirm roads, weather, local guidance and accommodation before travel. Travel to and from the region may need additional days.\nSource: https://e-tourism.visitgilgitbaltistan.gov.pk/\n`;
    const url = URL.createObjectURL(
      new Blob([content], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-gilgit-baltistan-journey.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  };
  return (
    <JournalDialog
      title={plan ? plan.title : "Make room for a little wonder."}
      onClose={onClose}
      wide
    >
      {!plan ? (
        <>
          <p className="dialog-intro">
            Choose a region and a pace. We’ll put together a thoughtful starting
            point for your journey, with heritage, local life and time to
            breathe.
          </p>
          <form className="planner-form" onSubmit={createPlan}>
            <label>
              Where would you like to go?
              <select
                ref={firstSelect}
                value={region}
                onChange={(event) => setRegion(event.target.value)}
              >
                <option value="hunza">Hunza & its living heritage</option>
                <option value="baltistan">
                  Skardu & the valleys of Baltistan
                </option>
                <option value="ghizer">Phander & the Ghizer valleys</option>
              </select>
            </label>
            <div className="form-row">
              <label>
                How much time?
                <select
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                >
                  <option value="3">3 days — a first introduction</option>
                  <option value="5">5 days — time to look closer</option>
                  <option value="7">7 days — take the slower road</option>
                </select>
              </label>
              <label>
                Your travel style
                <select
                  value={pace}
                  onChange={(event) => setPace(event.target.value)}
                >
                  <option value="balanced">A little of everything</option>
                  <option value="culture">Culture & everyday life</option>
                  <option value="unhurried">Extra slow & easy</option>
                </select>
              </label>
            </div>
            <p className="small-note">
              A locally generated draft. No account or personal details needed.
            </p>
            <button className="primary-button" type="submit">
              Create my journey <Icon name="route" size={19} />
            </button>
          </form>
        </>
      ) : (
        <>
          <div
            className="plan-meta"
            ref={resultSummary}
            tabIndex={-1}
            aria-label={`${plan.title}, ${plan.days.length} days, ${styleLabel(plan.pace)}`}
          >
            <span>
              <Icon name="calendar" size={18} />
              {plan.days.length} days
            </span>
            <span>
              <Icon name="walking" size={18} />
              {styleLabel(plan.pace)}
            </span>
          </div>
          <ol className="itinerary">
            {plan.days.map(([title, text], index) => (
              <li key={index}>
                <span className="day-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  {dayNote(plan.pace, index) && (
                    <p className="pace-note">{dayNote(plan.pace, index)}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <p className="planner-notice">
            This is a flexible starting point, not a booking or an access
            guarantee. Confirm weather, roads, guides and accommodation locally.
            Travel to and from the region may need additional days.
          </p>
          <div className="dialog-actions">
            <button className="primary-button" onClick={savePlan}>
              <Icon name={downloaded ? "check" : "download"} size={19} />
              {downloaded ? "Download again" : "Download my journey"}
            </button>
            <button className="text-button" onClick={() => setPlan(null)}>
              <Icon name="arrow-left" size={18} />
              Adjust my choices
            </button>
          </div>
          <p role="status" className="small-note">
            {downloaded
              ? "Your journey is ready as a text file."
              : "Keep this draft and discuss it with a local guide."}
          </p>
        </>
      )}
    </JournalDialog>
  );
}
