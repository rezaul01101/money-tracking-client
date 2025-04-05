"use client";
import React, { useState } from "react";
import { useUserUpdateMutation } from "@/src/redux/api/userApi";
import {
  useUpdateSettingsMutation,
  useGetSettingsQuery,
} from "@/src/redux/api/settingsApi";
import { useTheme } from "next-themes";
import { toast } from "react-hot-toast";
import Image from "next/image";
import FormSelect from "@/src/components/form/FormSelect";
import Form from "@/src/components/form/Form";
import { useDispatch } from "react-redux";
import { storeCurrency } from "@/src/redux/features/settingsSlice";

const user = {};

const isLoading = false;
const SettingPage = () => {
  const currencies = [
    { value: "USD", label: "US Dollar ($)", icon: "$" },
    { value: "EUR", label: "Euro (€)", icon: "€" },
    { value: "GBP", label: "British Pound (£)", icon: "£" },
    { value: "JPY", label: "Japanese Yen (¥)", icon: "¥" },
    { value: "INR", label: "Indian Rupee (₹)", icon: "₹" },
    { value: "BDT", label: "Bangladesh Taka (৳)", icon: "৳" },
  ];

  //   const { data: user, isLoading } = useGetUserQuery();
  const [updateUser] = useUserUpdateMutation();
  const { theme, setTheme } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [updateSettings] = useUpdateSettingsMutation();
  const { data: settings, isLoading } = useGetSettingsQuery();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await updateSettings(data).unwrap();
      if (res?.key === "currency") {
        const selectedCurrency = currencies.find(
          (curr) => curr.value === res.value
        );
        if (selectedCurrency) {
          dispatch(storeCurrency(selectedCurrency.icon));
        }
      }
      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update settings");
    }

    // try {
    //   const formData = new FormData();
    //   if (selectedImage) {
    //     formData.append("profilePicture", selectedImage);
    //   }
    //   if (data.currency) {
    //     formData.append("currency", data.currency);
    //   }
    //   if (data.currentPassword && data.newPassword) {
    //     formData.append("currentPassword", data.currentPassword);
    //     formData.append("newPassword", data.newPassword);
    //   }
    //   await updateUser(formData).unwrap();
    //   toast.success("Settings updated successfully");
    //   reset();
    // } catch (error) {
    //   toast.error(error?.data?.message || "Failed to update settings");
    // }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-full p-6">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <Form submitHandler={onSubmit}>
        <div className="bg-white rounded-lg shadow-md p-6 space-y-8 max-w-4xl">
          {/* Profile Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Profile Information</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                {previewImage || user?.profilePicture ? (
                  <Image
                    src={previewImage || user?.profilePicture}
                    alt="Profile"
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl">{user?.name?.[0]}</span>
                  </div>
                )}
                <label
                  htmlFor="profile-picture"
                  className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </label>
                <input
                  id="profile-picture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <div>
                <p className="font-semibold">{user?.name}</p>
                <p className="text-gray-600 dark:text-gray-300">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Currency Selection */}
          <div className="space-y-4">
            <FormSelect
              defaultValue={
                settings?.find((item) => item.key === "currency")?.value
              }
              label={"Select Currency"}
              id="currency"
              name="currency"
              placeholder="Select Currency"
              options={currencies?.map((currency) => ({
                label: currency.label,
                value: currency.value,
              }))}
            />
          </div>

          {/* Password Change */}
          <div className="space-y-4">
            {/* <h2 className="text-xl font-semibold">Change Password</h2> */}
            <div className="space-y-4">
              {/* <input
              type="password"
              {...register("currentPassword")}
              placeholder="Current Password"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="password"
              {...register("newPassword")}
              placeholder="New Password"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            /> */}
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Appearance</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {theme === "dark" ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  )}
                </svg>
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer">
              Save Changes
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SettingPage;
