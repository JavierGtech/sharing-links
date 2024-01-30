<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { user, userData, storage, db } from "$lib/firebase";
  import { doc, updateDoc } from "firebase/firestore";
  import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
  import { goto } from "$app/navigation";
    import Autentificate from "$lib/components/Autentificate.svelte";

  let previewURL: string;
  let uploading = false;
  $: href = `/${$userData?.username}`;

  async function upload(e: any) {
    uploading = true;
    const file = e.target.files[0];
    previewURL = URL.createObjectURL(file);
    const storageRef = ref(storage, `users/${$user!.uid}/profile.png`);
    const result = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(result.ref);

    await updateDoc(doc(db, "users", $user!.uid), { photoURL: url });
    uploading = false;
  }
</script>

<AuthCheck>
  <Autentificate>
  <form class="max-w-screen-md w-full">
    <div class="form-control w-full max-w-xs mx-auto text-center">
      <img
        src={previewURL ?? $userData?.photoURL ?? "/user.png"}
        alt="photoURL"
        width="100"
        class="mx-auto"
      />
      <label for="photoURL" class="label">
        <span class="label-text ">Sube una foto:</span>
      </label>
      <input
        on:change={upload}
        name="photoURL"
        type="file"
        class="file-input file-input-bordered w-full max-w-xs"
        accept="image/png, image/jpeg, image/gif, image/webp"
      />
      {#if uploading}
        <p>Cargando...</p>
        <progress class="progress progress-info w-56 mt-6" />
      {/if}
    </div>
  </form>

</Autentificate>
</AuthCheck>
