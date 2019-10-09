package com.androidhomework.locker.utils;

import android.app.Activity;

import java.util.ArrayList;
import java.util.List;

public class ActivityUtil {
    public static List<Activity> activities = new ArrayList<>();

    public static void addActivity(Activity activity) {
        activities.add(activity);
    }

    public static void removeActivity(Activity activity) {
        activities.remove(activity);
    }

    public static Activity getTop() {
        return activities.get(activities.size()-1);
    }

    public static void finishAll() {
        for (Activity activity : activities) {
            if (!activity.isFinishing()) {
                activity.finish();
            }
        }
    }
}
