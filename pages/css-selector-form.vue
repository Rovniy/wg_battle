<template>
  <el-row class="container" style="min-height: 100%; height: 100%">
    <el-col :span="12" style="height: 100%; padding: 40px">
      <textarea readonly="readonly" style="height: 100%; width: 100%">
        <form>
          <div class="line">
            <input type="email" value="example@" required>
            <div>
              <a>link</a>
              <span>text</span>
              <span>text</span>
            </div>
          </div>
          <div>
            <input type="email" value="example@gmail.com" required>
            <div>
              <a>link</a>
              <span>text</span> <!-- этот -->
              <span>text</span>
              <span>text</span>
              <span>text</span> <!-- этот -->
              <span>text</span>
            </div>
          </div>
          <div class="line">
            <input type="email" value="example@gmail.com" required>
            <div>
              <a>link</a>
              <span>text</span>
              <span>text</span>
              <div>
                <input type="email" value="example@gmail.com" required>
                <div>
                  <a>link</a>
                  <span>text</span>
                  <span>text</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </textarea>
    </el-col>
    <el-col :span="12" style="height: 100%; padding: 40px">
      <form>
        <div class="line">
          <input type="email" value="example@" required>
          <div>
            <a>link</a>
            <span>text</span>
            <span>text</span>
          </div>
        </div>
        <div>
          <input type="email" value="example@gmail.com" required>
          <div>
            <a>link</a>
            <span>text</span> <!-- этот -->
            <span>text</span>
            <span>text</span>
            <span>text</span> <!-- этот -->
            <span>text</span>
          </div>
        </div>
        <div class="line">
          <input type="email" value="example@gmail.com" required>
          <div>
            <a>link</a>
            <span>text</span>
            <span>text</span>
            <div>
              <input type="email" value="example@gmail.com" required>
              <div>
                <a>link</a>
                <span>text</span>
                <span>text</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </el-col>
  </el-row>
</template>
