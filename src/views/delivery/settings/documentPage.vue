<template>
  <div class="documents">
    <div class="contain">
      <Title class="title" title="My Documents" />

      <Box class="box">
        <Text class="head" text="Upload Required Documents" />

        <div class="doc-grid">
          <DocumentUpload
            label="Driver's License"
            :file="documents.license?.url"
            :status="documents.license?.status"
            @upload="(file) => uploadDocument('license', file)"
          />
          <DocumentUpload
            label="Vehicle Registration"
            :file="documents.registration?.url"
            :status="documents.registration?.status"
            @upload="(file) => uploadDocument('registration', file)"
          />
          <DocumentUpload
            label="Insurance"
            :file="documents.insurance?.url"
            :status="documents.insurance?.status"
            @upload="(file) => uploadDocument('insurance', file)"
          />
        </div>

        <GeneralButton
          class="submit-btn"
          :title="
            documents.submitted
              ? 'Documents Submitted'
              : 'Submit Documents for Review'
          "
          :btnColor="documents.submitted ? '#9ca3af' : '#3b82f6'"
          :titleColor="'white'"
          @click="!documents.submitted && submitDocuments()"
        />
      </Box>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Title from "@/components/delivery/title.vue";
import Box from "@/components/delivery/box.vue";
import Text from "@/components/delivery/text.vue";
import DocumentUpload from "@/components/delivery/DocumentUpload.vue";
import GeneralButton from "@/components/GeneralButton.vue";

export default {
  name: "MyDocuments",
  components: { Title, Box, Text, DocumentUpload, GeneralButton },
  setup() {
    const documents = ref({
      license: null,
      registration: null,
      insurance: null,
      submitted: false,
    });

    const fetchDocuments = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/driver/profile");

        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const data = await res.json();

        // Expecting `data.documents = { license, registration, insurance, submitted }`
        documents.value.license = data.documents.license || null;
        documents.value.registration = data.documents.registration || null;
        documents.value.insurance = data.documents.insurance || null;
        documents.value.submitted = data.documents.submitted || false;
      } catch (e) {
        console.error("Failed to load documents", e);
      }
    };

    const uploadDocument = async (type, file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      try {
        const res = await fetch("http://localhost:4000/api/driver/documents", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const updated = await res.json();
        documents.value[type] = updated;
      } catch (e) {
        console.error("Upload error:", e);
        alert("Failed to upload " + type);
      }
    };

    const submitDocuments = async () => {
      if (
        !documents.value.license?.url ||
        !documents.value.registration?.url ||
        !documents.value.insurance?.url
      ) {
        alert("Please upload all required documents before submitting.");
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:4000/api/driver/documents/submit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ submitted: true }),
          }
        );

        if (!res.ok) throw new Error("Submission failed");

        documents.value.submitted = true;
        alert("Documents submitted for review.");
      } catch (e) {
        console.error("Submission error:", e);
        alert("Failed to submit documents.");
      }
    };

    onMounted(fetchDocuments);

    return {
      documents,
      uploadDocument,
      submitDocuments,
    };
  },
};
</script>

<style scoped>
.documents {
  display: flex;
  width: 100vw;
}
.contain {
  padding: 80px;
  flex-direction: column;
  display: flex;
  gap: 20px;
}
.title {
  font-size: 40px;
  font-weight: 600;
}
.box {
  width: 120%;
  min-width: 700px;
  margin: 0 auto;
}
.head {
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 20px;
}
.doc-grid {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.submit-btn {
  margin-top: 30px;
  user-select: none;
}
</style>
