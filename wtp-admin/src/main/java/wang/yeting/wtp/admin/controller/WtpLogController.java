package wang.yeting.wtp.admin.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wang.yeting.wtp.admin.annotation.Permission;
import wang.yeting.wtp.admin.bean.WtpLog;
import wang.yeting.wtp.admin.model.Result;
import wang.yeting.wtp.admin.model.vo.WtpLogVo;
import wang.yeting.wtp.admin.service.WtpLogService;

import java.util.List;

/**
 * @author : weipeng
 * @date : 2020-07-27 15:51
 */
@Permission
@CrossOrigin
@RestController
@RequestMapping("/wtpLog")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class WtpLogController {

    private final WtpLogService wtpLogService;

    @GetMapping("/realTime")
    public Result<WtpLog> realTime(WtpLogVo WtpLogVo) {
        WtpLog wtpLog  = wtpLogService.realTime(WtpLogVo);
        return Result.success(wtpLog);
    }

    @GetMapping("/chart")
    public Result<List<WtpLog>> chart(WtpLogVo WtpLogVo) {
        List<WtpLog> wtpLogList  = wtpLogService.chart(WtpLogVo);
        return Result.success(wtpLogList);
    }

}
