// npm i node-fetch

// utils/sendFeedbackToGoogleForm.ts
export const sendFeedbackToGoogleForm = async ({
  selectedAreas,
  feedback,
  userId,
  name,
}: {
  selectedAreas: string[];
  feedback: string;
  userId?: string;
  name: string;
}) => {
  const fetch = (await import("node-fetch")).default;

  // Correct formResponse URL
  const formUrl =
    process.env.Googel_Form_Link ||
    "https://docs.google.com/forms/d/e/1FAIpQLSdYYnooyHdYQZNnehWEgqcyPlvrKQmJL8UEeKQcoFaVeIySVg/formResponse";

  const formData = new URLSearchParams();
  formData.append(process.env.GForm_Name_Entry || "entry.755436927", name); // Name
  formData.append(
    process.env.GForm_SelectedArea_Entry || "entry.341846892",
    selectedAreas.join(", ")
  ); // Selected Areas
  formData.append(
    process.env.GForm_FeedbackText_Entry || "entry.111146190",
    feedback
  ); // Feedback
  if (userId)
    formData.append(
      process.env.GForm_UserID_Entry || "entry.1814875769",
      userId
    ); // User ID

  const response = await fetch(formUrl, {
    method: "POST",
    body: formData,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  console.log("Google Form response:", response.status); // helpful for debugging
  return response.ok;
};
