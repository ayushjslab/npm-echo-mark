interface SaveData {
  name: string;
  email: string;
  description: string;
  rating: number;
}

export class FeedbackAPI {
  private static BASE_URL = "https://echomark.vercel.app/api";

  // -------------------------------------------------------
  // 1. VALIDATE SITE
  // -------------------------------------------------------
  static async validateSite(siteId: string) {
    try {
      if (!siteId) {
        return { success: false, message: "Site ID required" };
      }

      const res = await fetch(
        `${this.BASE_URL}/validate-site`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ siteId }),
        }
      );

      if (!res.ok) {
        return { success: false, message: "Site validation failed" };
      }

      const data = await res.json();
      return { success: true, data, message: "Site ID validated" };
    } catch (error) {
      console.log("ValidateSite Error:", error);
      return { success: false, message: "Server error while validating site" };
    }
  }

  // -------------------------------------------------------
  // 2. FETCH STYLES
  // -------------------------------------------------------
  static async fetchStyles(siteId: string) {
    try {
      if (!siteId) {
        return { success: false, message: "Site ID required" };
      }

      const res = await fetch(
        `${this.BASE_URL}/website/fetch-styles?websiteId=${siteId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        return { success: false, message: "Failed to fetch styles" };
      }

      const data = await res.json();
      return { success: true, data, message: "Styles fetched successfully" };
    } catch (error) {
      console.log("FetchStyles Error:", error);
      return { success: false, message: "Server error while fetching styles" };
    }
  }

  // -------------------------------------------------------
  // 3. SAVE FEEDBACK
  // -------------------------------------------------------
  static async saveFeedback(siteId: string, data: SaveData) {
    try {
      const { name, email, description, rating } = data;

      if (!name || !email || !description || !rating) {
        return { success: false, message: "Please fill all required fields" };
      }

      const res = await fetch(`${this.BASE_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId,
          name,
          email,
          text: description,
          rating,
        }),
      });

      if (!res.ok) {
        return { success: false, message: "Failed to send feedback" };
      }

      const result = await res.json();
      return {
        success: true,
        data: result,
        message: "Feedback saved successfully",
      };
    } catch (error) {
      console.log("SaveFeedback Error:", error);
      return { success: false, message: "Server error while saving feedback" };
    }
  }
}
