import { mkGetEstatesForUser } from "../EstatesApi"
import * as T from "fp-ts/Task"

it("should call persistence and return what it returns", async () => {
  const id: any = "some id"
  const estate: any = { some: "estate" }
  const persistence = jest.fn().mockReturnValueOnce(T.of(estate))

  const result = await mkGetEstatesForUser(persistence)(id)()

  expect(persistence).toBeCalledWith(id)
  expect(result).toEqual(estate)
})
