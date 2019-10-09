package com.androidhomework.locker;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.androidhomework.locker.utils.ActivityUtil;
import com.androidhomework.locker.utils.LogUtil;

public abstract class BaseActivity extends AppCompatActivity {

    protected String TAG = getClass().getSimpleName();

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        LogUtil.d(TAG, "onCreate");
        ActivityUtil.addActivity(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        LogUtil.d(TAG, "onDestory");
        ActivityUtil.removeActivity(this);
    }

    public void goToActivity(Class clzz) {
        Intent intent = new Intent(this, clzz);
        startActivity(intent);
    }

    public void toast(int resId) {
        toast(this.getString(resId));
    }

    public void toast(String text) {
        Toast toastInstance = Toast.makeText(this, text, Toast.LENGTH_SHORT);
        toastInstance.show();
    }
}
