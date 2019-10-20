//
//  CameraManager.m
//  PleoMobileChallenge
//
//  Created by Alireza Ghamkhar on 7/28/1398 AP.
//  Copyright © 1398 Facebook. All rights reserved.
//

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(CameraManager, RCTEventEmitter)
RCT_EXTERN_METHOD(takeImage)
@end
