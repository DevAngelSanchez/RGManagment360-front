{/* {isProvider && (
          <div className="flex flex-row justify-between w-full mb-6 pt-7">
            <FormItem className=" w-6/12">
              <div className="grid w-3/4  items-center gap-1.5">
                <Label>Department</Label>
                <Select onValueChange={handleSelectService}>
                  <SelectTrigger className="w-3/4">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electricity">Electricity</SelectItem>
                    <SelectItem value="gardening">Gardening</SelectItem>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>

            {specialFieldSelected === "electricity" ? (
              <FormItem className=" w-6/12">
                <div className="grid w-3/4  items-center gap-1.5">
                  <Label> Electricity </Label>
                  <Select>
                    <SelectTrigger className="w-3/4">
                      <SelectValue placeholder="Speciality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lights">Lights</SelectItem>
                      <SelectItem value="appliances">Appliances</SelectItem>
                      <SelectItem value="high voltage">High voltage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            ) : specialFieldSelected === "gardening" ? (
              <FormItem className=" w-6/12">
                <div className="grid w-3/4  items-center gap-1.5">
                  <Label> Gardening </Label>
                  <Select>
                    <SelectTrigger className="w-3/4">
                      <SelectValue placeholder="Speciality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plantWatering">
                        Plant watering
                      </SelectItem>
                      <SelectItem value="cutDownPlants">
                        Cut down plants
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            ) : specialFieldSelected === "plumbing" ? (
              <FormItem className=" w-6/12">
                <div className="grid w-3/4  items-center gap-1.5">
                  <Label> Plumbing </Label>
                  <Select>
                    <SelectTrigger className="w-3/4">
                      <SelectValue placeholder="Speciality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bathrooms">Bathrooms</SelectItem>
                      <SelectItem value="leaks">Leaks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            ) : specialFieldSelected === "gardening" ? (
              <FormItem className=" w-6/12">
                <div className="grid w-3/4  items-center gap-1.5">
                  <Label> Gardening </Label>
                  <Select>
                    <SelectTrigger className="w-3/4">
                      <SelectValue placeholder="Speciality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plantWatering">
                        Plant watering
                      </SelectItem>
                      <SelectItem value="cutDownPlants">
                        Cut down plants
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            ) : null}
          </div>
        )} */}