import { useEffect, useState } from "react"

import CollectionList from "../components/collections/CollectionList"
import CollectionForm from "../components/collections/CollectionForm"

import {
  getCollections,
  createCollection,
  deleteCollection
} from "../services/collectionService"

export default function Collections() {

  const [collections, setCollections] = useState([])

  async function loadCollections() {
    const data = await getCollections()
    setCollections(data)
  }

  useEffect(() => {
    let ignore = false;
    getCollections().then(data => {
      if (!ignore) setCollections(data);
    });
    return () => { ignore = true; };
  }, [])

  async function handleCreate(data) {
    await createCollection(data)
    loadCollections()
  }

  async function handleDelete(id) {
    await deleteCollection(id)
    loadCollections()
  }

  return (
    <div>

      <h1>Collections</h1>

      <CollectionForm onSubmit={handleCreate} />

      <CollectionList
        collections={collections}
        onDelete={handleDelete}
      />

    </div>
  )
}