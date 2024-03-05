import supabase from "./supaBase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }

  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  return data;
}

export async function createAndEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(
    import.meta.env.VITE_SUPABASE_URL
  );
  /**IMAGE URL:- https://rxufhhpgcexvszntcykk.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg */
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/cabin-images/${imageName}`;

  /**1) CREATE /EDIT A CABIN */
  let query = supabase.from("cabins");

  /**CREATE CABIN -->1st query*/
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  /**EDIT CABIN -->2nd query*/
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }

  /**EDITING FROM --> CASE 1: I HAVE NOT UPLOADED A NEW  IMAGE
   * CASE 2 : I HAVE UPLOADED A NEW IMAGE
   */
  /**CASE 1: */
  // if (imagePath) return data;
  /**CASE 2: UPLOADED IMAGE  */
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  /**3) DELETE THE CABIN IF THERE WAS AN ERROR */
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created"
    );
  }
  return data;
}
