<script lang="ts">
    import Autentificate from "$lib/components/Autentificate.svelte";
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { db, user, userData } from "$lib/firebase";
    import { doc, getDoc, writeBatch } from "firebase/firestore";

    let username = "";
    let loading = false;
    let isAvailable = false;

    let debounceTimer: NodeJS.Timeout;

    const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    $: isValid =
        username?.length > 2 && username.length < 16 && re.test(username);
    $: isTouched = username.length > 0;
    $: isTaken = isValid && !isAvailable && !loading;

    async function checkAvailability() {
        isAvailable = false;
        clearTimeout(debounceTimer);

        loading = true;

        debounceTimer = setTimeout(async () => {
            console.log("checking availability of", username);

            const ref = doc(db, "usernames", username);
            const exists = await getDoc(ref).then((doc) => doc.exists());

            isAvailable = !exists;
            loading = false;
        }, 500);
    }

    async function confirmUsername() {
        console.log("confirming username", username);
        const batch = writeBatch(db);
        batch.set(doc(db, "usernames", username), { uid: $user?.uid });
        batch.set(doc(db, "users", $user!.uid), {
            username,
            photoURL: $user?.photoURL ?? null,
            published: true,
            bio: "I am the Walrus",
            links: [
                {
                    title: "Test Link",
                    url: "https://kung.foo",
                    icon: "custom",
                },
            ],
        });

        await batch.commit();

        username = "";
        isAvailable = false;
    }
</script>

<AuthCheck>
    <Autentificate>
        {#if $userData?.username}
            <p>
                <span class="text-sm text-success"
                    >Ya tienes nombre de usuario:
                </span><span class="text-info font-bold"
                    >@{$userData.username}</span
                >
            </p>
            <p class="text-xs">(Los nombres no se pueden cambiar)</p>
            <a href="/login/photo" class="btn btn-success btn-outline"
                >Siguiente</a
            >
        {:else}
            <form class="w-2/5" on:submit|preventDefault={confirmUsername}>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    class="input w-full"
                    bind:value={username}
                    on:input={checkAvailability}
                    class:input-error={!isValid && isTouched}
                    class:input-warning={isTaken}
                    class:input-success={isAvailable && isValid && !loading}
                />
                <div class="my-4 min-h-16 px-8 w-full">
                    {#if loading}
                        <p class="text-secondary">
                            Confirmando disponibilidad de @{username}...
                        </p>
                    {/if}

                    {#if !isValid && isTouched}
                        <p class="text-error text-sm">
                            debe ser de 3 a 16 caracteres, solo alfanuméricos
                        </p>
                    {/if}

                    {#if isValid && !isAvailable && !loading}
                        <p class="text-warning text-sm">
                            @{username} no está disponible
                        </p>
                    {/if}

                    {#if isAvailable}
                        <button class="btn btn-success"
                            >Confirmar nombre de usuario @{username}
                        </button>
                    {/if}
                </div>
            </form>
        {/if}
    </Autentificate>
</AuthCheck>
